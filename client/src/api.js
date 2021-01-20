import axios from 'axios';
import { notification } from 'antd';

import store from './store';
import { logoutAction } from './redux/auth/actions';

const api = axios.create({
    baseURL: '/api',
});

api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (err) => {
        if (err.response.status === 403) {
            store.dispatch(logoutAction());
            return Promise.reject(err);
        }

        notification.error({
            message: 'Error',
            description: err.response.data.message,
        });

        return Promise.reject(err);
    }
);

export default api;
