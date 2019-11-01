import cookie from 'react-cookies';
import aesjs from 'aes-js';

import api from '../services/api';

export const login = async (email, password) => {
    const body = {
        email,
        password
    }

    await api.post("auth/login/", body)
        .then(res => {
            const token = res.data['key'];
            const expires = new Date();
            expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
            let tokenBytes = aesjs.utils.utf8.toBytes(token);
            var aesCtr = new aesjs.ModeOfOperation.ctr(process.env.REACT_APP_CTRK.split('').map((i)=>Number(i)), new aesjs.Counter(5));
            let encryptedBytes = aesCtr.encrypt(tokenBytes);
            var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
            cookie.save('token', encryptedHex, {
                path: '/',
                expires,
                //httpOnly: true,
                //secure: true,
            });
        })
};

export const getUserInfo = () => {
    api.get("auth/user/", { headers: { Authorization: `Token ${getToken()}` } }) 
        .then((res) => {
            const expires = new Date();
            expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
            cookie.save('firstName', res.data['first_name'], {
                path: '/',
                expires,
                //httpOnly: true,
                //secure: true,
            })
        });
}

export const getFirstName = () => {
    return cookie.load('firstName');
}

export const getToken = () => {
    let encryptedToken = cookie.load('token');
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedToken);
    var aesCtr = new aesjs.ModeOfOperation.ctr(process.env.REACT_APP_CTRK.split('').map((i)=>Number(i)), new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    var decryptedToken = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedToken;

};

export const logout = async () => {
    await api.post("auth/logout/", { headers: { Authorization: `Token ${getToken()}` } })
        .then(() => {
            cookie.remove('token'); 
        })
};

export const isAuthenticated = () => cookie.load('token') !== undefined ? true : false;