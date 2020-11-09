import axios from 'axios';

export const wind_prediction_url = (lat, lng) => {
  return `http://35.198.192.10/predictions/wind?latitude=${lat}&longtitude=${lng}`;
};

export const solar_prediction_url = (lat, lng) => {
  return `http://35.198.192.10/predictions/solar?latitude=${lat}&longtitude=${lng}`;
};

export const geothermal_prediction_url = (lat, lng, turbine) => {
  return `http://35.198.192.10/predictions/solar?latitude=${lat}&longtitude=${lng}&turbine=${turbine}`;
};

export const fetcher = (url) => axios.post(url).then((r) => r.data);
