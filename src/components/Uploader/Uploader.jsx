import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ImageUploader from "react-images-upload";
import runModel from '../Models/Models';



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
    const src = window.URL.createObjectURL(picture[0])
    const pic = new Image(64, 64);
    pic.src = src;
    setPictures([src])
    runModel(pic).then(model => console.log(model));
    console.log(pictures)
  };

  const handleOnClick = (e => {

    e.preventDefault();
    setPictures([]);
    console.log(pictures)
  })

  const Preview = () => {

    return (
      (pictures === null || pictures === []) 
        ? (<div></div>) :
        (<img src={pictures} alt={'thisistest'}/>) 
    )
  }

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
        <Preview/>
      </Container>
    </div>
  )
}

export default Uploader;