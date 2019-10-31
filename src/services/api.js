import axios from 'axios';
import { DEBUG } from '../config/settings';

var baseURL = DEBUG ? 'http://localhost:8080/api/v1/' : 'https://domos.icu/api/v1/';

const api = axios.create({
    baseURL,
})

export default api;