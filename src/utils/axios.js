import axios from 'axios';
let baseUrl = 'http://localhost:3500/';

const instance = axios.create({
    baseURL: baseUrl
});
export default instance;
