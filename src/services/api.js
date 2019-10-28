import axios from 'axios';

const api = axios.create({
    baseURL: 'https://domos.icu/api/v1/',
})

export default api;