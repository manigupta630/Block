import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export function proxy(request) {
  return axios(proxyUrl + request.url, request.config);
}
