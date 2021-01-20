import { TODO_TYPES as TYPES } from './types';
import api from '../../api';
import { getToken, setToken, removeToken } from '../../utils';

const loginAction = (payload) => ({ type: TYPES.login, payload });

const createJobAction = (payload) => ({ type: TYPES.createUserJob, payload });
const updateJobAction = (payload) => ({ type: TYPES.updateUserJob, payload });
const deleteJobAction = (payload) => ({ type: TYPES.deleteUserJob, payload });

export const performLogin = (data) => (dispatch) => {
    api.post('/login', data).then((res) => {
        setToken(res.accessToken);
        dispatch(loginAction(res.user));
    });
};

export const performSignup = (data) => (dispatch) => {
    api.post('/signup', data).then((res) => {
        setToken(res.accessToken);
        dispatch(loginAction(res.user));
    });
};

export const logoutAction = () => (dispatch) => {
    removeToken();
    dispatch({ type: TYPES.logout });
};

export const getSelf = () => (dispatch) => {
    api.get('/user', {
        headers: {
            authorization: getToken('Bearer'),
        },
    }).then((res) => {
        dispatch(loginAction(res));
    });
};

export const createJob = (data) => (dispatch) => {
    api.post('/user/job', data, {
        headers: {
            authorization: getToken('Bearer'),
        },
    }).then((res) => {
        dispatch(createJobAction(res));
    });
};

export const updateJob = (data) => (dispatch) => {
    api.put('/user/job', data, {
        headers: {
            authorization: getToken('Bearer'),
        },
    }).then((res) => {
        dispatch(updateJobAction(res));
    });
};

export const deleteJob = (jobId) => (dispatch) => {
    api.delete(`/user/job/${jobId}`, {
        headers: {
            authorization: getToken('Bearer'),
        },
    }).then((res) => {
        dispatch(deleteJobAction(res));
    });
};
