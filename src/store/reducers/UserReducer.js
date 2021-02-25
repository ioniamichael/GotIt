import {FETCH_USER_DETAILS} from '../types';

const initialState = {
    userDetails: {},
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload,
            };
        default:
            return state;
    }
};

export default UserReducer;
