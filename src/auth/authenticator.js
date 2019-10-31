import cookie from 'react-cookies';

import api from '../services/api';

export const login = async (username, password) => {
    const body = {
        username,
        password
    }

    await api.post("auth/login/", body)
        .then(res => {
            const expires = new Date();
            expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
            cookie.save('token', res.data['key'], {
                path: '/',
                expires,
                //httpOnly: true,
                //secure: true,
            });
        })
};

export const getToken = () => {
    return cookie.load('token');
};

export const logout = async () => {
    await api.post("auth/logout/", { headers: { Authorization: `Token ${getToken()}` } })
        .then(() => {
            cookie.remove('token'); 
        })
};

export const isAuthenticated = () => cookie.load('token') !== undefined ? true : false;