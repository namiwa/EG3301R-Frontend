import * as tf from '@tensorflow/tfjs';
import JsonModel from './mobile_model_web/model.json';
import shard1 from './mobile_model_web/group1-shard1of4.bin';
import shard2 from './mobile_model_web/group1-shard2of4.bin';
import shard3 from './mobile_model_web/group1-shard3of4.bin';
import shard4 from './mobile_model_web/group1-shard4of4.bin';
//create the raw file object

const rawBinList = [
  shard1,
  shard2,
  shard3,
  shard4,
];

const names = [];

const binaryWrapper =  () => {

  const starter = 'mobile_model_web/group1-shard';
  const ender = 'of4.bin';
  return rawBinList.map( async (val, i) => {
    let j = i + 1
    const name = starter + j + ender;
    names.push(name);
    return await fetch(val, {mode: 'no-cors'}).then(res => {
      return res.arrayBuffer();
    })
  })
}

const st = JSON.stringify(JsonModel);
const blob = new Blob([st], { type: 'application/json' });
const file = new File([blob], 'first_model_web/model.json');


export const runModel = async (imageFile) => {
  const input = tf.browser.fromPixels(imageFile);
  const resized = tf.cast(input, 'float32');
  const t4d = tf.tensor4d(Array.from(resized.dataSync()),[1,64,64,3])
  const binaryWeights = await Promise.all([binaryWrapper()])
    .then((res) => {
      const test = Promise.all(...res)
      return test;
    })
  const weightsFiles = binaryWeights.map((val, ind) => {
    const u8intview = new Uint8Array(val);  
    const blob = new Blob([u8intview])
    const file = new File([blob], names[ind]);
    return file;
  })
  return await tf.loadGraphModel(tf.io.browserFiles([file, ...weightsFiles]), {
    strict: false,
  })
  .then(test => test.predict(t4d).dataSync())
  .catch(err => console.log(err))
}


export default runModel;