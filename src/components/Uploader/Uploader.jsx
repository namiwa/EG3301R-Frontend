import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from "react-images-upload";
import runModel from '../Models/Models';
import resNetModel from '../Models/Models_rsnet';

/*
add the classifiers CATEGORIES = ["AnnualCrop", "Forest", "HerbaceousVegetation", "Highway", 
              "Industrial", "Pasture", "PermanentCrop", "Residential", 
              "River", "SeaLake"]
*/

// Add other routes for potential predictive features, about the project, anything interesting

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100
  },
  appContainer: {
    background: '#ffffffff  '
  }
}))

export const Uploader = (props) => {
  const classes = useStyles();

  const [pictures, setPictures] = useState(null);

  const onDrop = picture => {
    const src = window.URL.createObjectURL(picture[picture.length - 1])
    const pic = new Image(64, 64);
    pic.src = src;
    pic.crossOrigin = '';
    setPictures([src])
    runModel(pic).then(model => model);
    resNetModel(src).then(model => console.log(model));
    console.log(pic)
  };

  const handleOnClick = (e => {
    e.preventDefault();
    console.log(pictures)
  })

  return (
    <div className={classes.root}>
      <Container className={classes.appContainer}>
        Upload any satellite image to see the classifier results!
        <br/>
        <br/>
        <Button onClick={handleOnClick} variant="contained" colour="primary">Clear Image!</Button> 
        <ImageUploader
        {...props}
        onChange={onDrop}
        imgExtension={[".jpg",".png"]}
        maxFileSize={5242880}
        />
        <canvas id='tutorial'></canvas>
      </Container>
    </div>
  )
}

export default Uploader;