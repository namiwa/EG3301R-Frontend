import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import ImageUploader from "react-images-upload";
import Model from "../Models/Model";
import { Paper } from "@material-ui/core";

const CATEGORIES = [
  "AnnualCrop",
  "Forest",
  "HerbaceousVegetation",
  "Highway",
  "Industrial",
  "Pasture",
  "PermanentCrop",
  "Residential",
  "River",
  "SeaLake",
];

// Add other routes for potential predictive features, about the project, anything interesting

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100,
  },
  paper: {
    background: "#ffffff",
    opacity: 0.85,
    padding: 20,
  },
  cardContainer: {
    boxShadow: 0,
  },
}));

export const Uploader = (props) => {
  const classes = useStyles();

  const [pictures, setPictures] = useState(null);

  const [detection, setDetection] = useState({
    outputClass: "",
  });

  const onDrop = (picture) => {
    const src = window.URL.createObjectURL(picture[picture.length - 1]);
    const pic = new Image(64, 64);
    pic.src = src;
    pic.crossOrigin = "";
    setPictures([src]);
    Model(src).then((output) => {
      const ans = CATEGORIES[output];
      setDetection({
        outputClass: ans,
      });
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setDetection({
      outputClass: "",
    });
    setPictures([]);
  };

  const Preview = () => {
    return pictures === null || pictures === [] || pictures.length === 0 ? (
      <div></div>
    ) : (
      <img
        src={pictures[pictures.length - 1]}
        alt={"thisistest"}
        width={200}
        height={200}
      />
    );
  };

  const Display = () => {
    return (
      <Card className={classes.cardContainer}>
        <Typography>
          {" "}
          {detection.outputClass === ""
            ? "Upload an image to test the model!"
            : "The model thinks the image label is a " +
              detection.outputClass}{" "}
        </Typography>
        <canvas id="tutorial"></canvas>
      </Card>
    );
  };

  const ReadMore = () => {
    return (
      <div>
        <Card className={classes.cardContainer}>
          <CardContent>
            <Typography>
              This is a demonstration of our interim prototype for land Image
              Classification for Urban Planners.
            </Typography>
            <Typography>
              The model is loaded on the browser, and uses the Tensorflow.js
              library to run the image classification.
            </Typography>
          </CardContent>
        </Card>
        <br />
        <br />
      </div>
    );
  };

  const Header = () => {
    return (
      <div>
        <Typography>
          The possible image labels are{" "}
          {CATEGORIES.map((val) => {
            return val + " ";
          })}
          .
        </Typography>
        <Typography>
          The model was trained on the{" "}
          <Link href="https://github.com/phelber/EuroSAT">
            Eurosat Dataset.
          </Link>
        </Typography>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Container>
        <Paper className={classes.paper}>
          <ReadMore />
          <Button onClick={handleOnClick} variant="contained" colour="primary">
            Clear Image!
          </Button>
          <ImageUploader
            {...props}
            onChange={onDrop}
            imgExtension={[".jpg", ".png"]}
            maxFileSize={5242880}
          />
          <Preview />
          <Display />
          <Header />
        </Paper>
      </Container>
    </div>
  );
};

export default Uploader;
