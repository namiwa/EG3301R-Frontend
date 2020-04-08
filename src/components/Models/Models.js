import * as tf from '@tensorflow/tfjs';
import JsonModel from './first_model_web/model.json';
import shard1 from './first_model_web/group1-shard1of23.bin';
import shard2 from './first_model_web/group1-shard2of23.bin';
import shard3 from './first_model_web/group1-shard3of23.bin';
import shard4 from './first_model_web/group1-shard4of23.bin';
import shard5 from './first_model_web/group1-shard5of23.bin';
import shard6 from './first_model_web/group1-shard6of23.bin';
import shard7 from './first_model_web/group1-shard7of23.bin';
import shard8 from './first_model_web/group1-shard8of23.bin';
import shard9 from './first_model_web/group1-shard9of23.bin';
import shard10 from './first_model_web/group1-shard10of23.bin';
import shard11 from './first_model_web/group1-shard11of23.bin';
import shard12 from './first_model_web/group1-shard12of23.bin';
import shard13 from './first_model_web/group1-shard13of23.bin';
import shard14 from './first_model_web/group1-shard14of23.bin';
import shard15 from './first_model_web/group1-shard15of23.bin';
import shard16 from './first_model_web/group1-shard16of23.bin';
import shard17 from './first_model_web/group1-shard17of23.bin';
import shard18 from './first_model_web/group1-shard18of23.bin';
import shard19 from './first_model_web/group1-shard19of23.bin';
import shard20 from './first_model_web/group1-shard20of23.bin';
import shard21 from './first_model_web/group1-shard21of23.bin';
import shard22 from './first_model_web/group1-shard22of23.bin';
import shard23 from './first_model_web/group1-shard23of23.bin';
//create the raw file object

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
  shard12,
  shard13,
  shard14,
  shard15,
  shard16,
  shard17,
  shard18,
  shard19,
  shard20,
  shard21,
  shard22,
  shard23,  
];

const fileBinList = [];
const starter = 'first_model_web/group1-shard';
const ender = 'of23.bin';

for (let i = 0; i < rawBinList.length; i++) {
  let j = i + 1
  const name = starter + j + ender;
  let allText = '';
  const rawFile = new XMLHttpRequest();
  rawFile.open("GET", rawBinList[i], true);
  // eslint-disable-next-line no-loop-func
  rawFile.responseType = 'blob';
  rawFile.onload = (event) => {
    allText = rawFile.response;
  }
  rawFile.send(null);
  const fl = new File([allText], name);
  fileBinList.push(fl);
}

const st = JSON.stringify(JsonModel);

const blob = new Blob([st], { type: 'application/json' });

const file = new File([blob], 'first_model_web/model.json');


export const runModel = async (imageFile) => {
  const input = tf.browser.fromPixels(imageFile);
  console.log(input);
  // const model = await tf.loadGraphModel(tf.io.browserFiles([file, ...fileBinList]), {
  //   weightPathPrefix: 'first_model_web'
  // })
  // .then(test => console.log(test))
  // .catch(err => console.log(err));

  // console.log(model)
  
  return input
}


export default runModel;