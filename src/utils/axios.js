import axios from 'axios';
let baseUrl = 'http://192.168.43.162:3500/';

const instance = axios.create({
    baseURL: baseUrl
});
export default instance;
