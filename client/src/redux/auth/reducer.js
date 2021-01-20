import { TODO_TYPES as TYPES } from './types';
import { getToken } from '../../utils';

const DEFAULT_STATE = {
    user: {
        username: '',
        jobs: [],
    },
    authorized: getToken() ?? false,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case TYPES.login:
            return {
                ...state,
                authorized: true,
                user: {
                    ...payload,
                    jobs: payload.jobs.reverse(),
                },
            };
        case TYPES.logout:
            return {
                ...state,
                authorized: false,
                user: {},
            };
        case TYPES.createUserJob:
            return {
                ...state,
                user: {
                    ...state.user,
                    jobs: [payload, ...state.user.jobs],
                },
            };
        case TYPES.updateUserJob:
            return {
                ...state,
                user: {
                    ...state.user,
                    jobs: state.user.jobs.map((job) =>
                        job._id === payload._id ? { ...job, ...payload } : job
                    ),
                },
            };
        case TYPES.deleteUserJob:
            return {
                ...state,
                user: {
                    ...state.user,
                    jobs: state.user.jobs.filter((job) => job._id !== payload),
                },
            };
        default:
            return state;
    }
};
