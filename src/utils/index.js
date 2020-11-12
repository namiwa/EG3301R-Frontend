import * as https from 'http';
import axios from 'axios';

const url = 'https://35.198.192.10/';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export const wind_prediction_url = (lat, lng) => {
  return url + `predictions/wind?latitude=${lat}&longtitude=${lng}`;
};

export const solar_prediction_url = (lat, lng) => {
  return url + `predictions/solar?latitude=${lat}&longtitude=${lng}`;
};

export const geothermal_prediction_url = (lat, lng, turbine) => {
  return (
    url +
    `predictions/geothermal?latitude=${lat}&longtitude=${lng}&turbine=${turbine}`
  );
};

/**
 * Returns data object after request is made.
 * Currently using insecure method of self-sign cert for demo purposes.
 * @param {string} url to backend server.
 */
export const fetcher = (url) =>
  axios.post(url, { httpsAgent: agent }).then((r) => r.data);
