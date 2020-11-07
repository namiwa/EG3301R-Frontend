import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import Label from '../../assets/future/Labelling.png';
import Load from '../../assets/future/Loading.png';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 100,
  },
}));

export const FutureWork = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Typography>
        We plan to create a model which would be able to identify and predict
        potential areas for renewable sources of energy.
      </Typography>
      <Typography>
        The model would also be able to predict the output for the 4 renewable
        sources we are targetting which are Hydro, Solar, Wind and Geothermal.
      </Typography>
      <img src={Load} alt="Loading" />
      <img src={Label} alt="Labelling" />
    </Card>
  );
};

export default FutureWork;
