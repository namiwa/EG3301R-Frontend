import {getTFModel, reformImageTensor, getImageFile, indexOfMax } from './ModelUtils';
import * as tf from '@tensorflow/tfjs';

// import all .bin and json
import JsonModel from './first_model_web/model.json';
import shard1 from './first_model_web/group1-shard1of11.bin';
import shard2 from './first_model_web/group1-shard2of11.bin';
import shard3 from './first_model_web/group1-shard3of11.bin';
import shard4 from './first_model_web/group1-shard4of11.bin';
import shard5 from './first_model_web/group1-shard5of11.bin';
import shard6 from './first_model_web/group1-shard6of11.bin';
import shard7 from './first_model_web/group1-shard7of11.bin';
import shard8 from './first_model_web/group1-shard8of11.bin';
import shard9 from './first_model_web/group1-shard9of11.bin';
import shard10 from './first_model_web/group1-shard10of11.bin';
import shard11 from './first_model_web/group1-shard11of11.bin';


const rawBinList = [
  shard1,
  shard2,
  shard3,
  shard4,
  shard5,
  shard6,
  shard7,
  shard8,
  shard9,
  shard10,
  shard11,
];

// namelist, different for each model
const starter = 'first_model_web/group1-shard';
const ender = 'of11.bin';

const names = rawBinList.map((val, ind) => {
  const j = ind + 1;
  return starter + j + ender;
})

export const rsNetModel = async (imagePath) => {
  await getImageFile(imagePath) // This line enables the model to run
  const img = new Image(64, 64)
  img.src = imagePath;
  let canvas = document.getElementById('tutorial');
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  let imgData = ctx.getImageData(0, 0, 64, 64)
  const threeInput = tf.browser.fromPixels(imgData)
  const model = await getTFModel(rawBinList, JsonModel, names);
  const input = reformImageTensor(threeInput)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const output = await model.predict(input).data();
  console.log(output)
  return indexOfMax(output);
}

export default rsNetModel;
