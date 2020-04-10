// Helper functions to attain local server files to process in tensorflow.js  
import * as tf from '@tensorflow/tfjs';

const getBinaryArrayPromise = (binaryPathArray = []) => {
  return binaryPathArray.map( async (binaryPath) => {
    return await fetch(binaryPath, {mode: 'no-cors'})
      .then(res => {
        return res.arrayBuffer();
      })
  })
}

export const getImageFile = async (imageURL) => {
  console.log(imageURL)
  return await fetch(imageURL, {mode: 'no-cors'})
    .then(res => {
      return res.arrayBuffer();
    })
    .then(buffer => {
      return new Uint8ClampedArray(buffer);
    })
}


const getBinaryWeightFiles = async (binaryPathArray = [], names = []) => {
  const binaryWeights =  await Promise.all([getBinaryArrayPromise(binaryPathArray)])
    .then(res => {
      return Promise.all(...res)
    });
  const weightFiles = binaryWeights.map((val, ind) => {
    const u8intview = new Uint8Array(val);
    const blob = new Blob([u8intview]);
    const file = new File([blob], names[ind]);
    return file;
  })
  return weightFiles;
} 

const getJsonFile = (jsonObject = {}) => {
  const st = JSON.stringify(jsonObject);
  const blob = new Blob([st], { type: 'application/json' });
  return new File([blob], 'fist_model_web/model.json');
}

export const reformImageTensor = (threeInputTensor) => {
  const resized = tf.cast(threeInputTensor, 'float32').div(255);
  const t4d = tf.tensor4d(Array.from(resized.dataSync()),[1,64,64,3]);
  return t4d;
}

export const getTFModel = async (binaryPathArray = [], jsonObject = {}, names = ['']) => {
  const jsonFile = getJsonFile(jsonObject);
  const weightFiles = await getBinaryWeightFiles(binaryPathArray, names);
  return await tf.loadGraphModel(tf.io.browserFiles([jsonFile, ...weightFiles]), {
    strict: false,
  })
}

export default { getTFModel, reformImageTensor, getImageFile };