import axios from 'axios';

const apiB2B = axios.create({
   responseType: 'json',
   baseURL: '/_v/',
});

export default apiB2B;