import axios from 'axios';

const instance = axios.create({
    baseURL:'http://192.168.1.28:3500/'
});
export default instance;