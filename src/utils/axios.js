import axios from 'axios';
let baseUrl = 'http://192.168.1.8:3500/';

const instance = axios.create({
    baseURL: baseUrl
});
export default instance;
