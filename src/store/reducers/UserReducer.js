import {FETCH_USER_DETAILS, SEARCH_USER} from '../types';

const initialState = {
    currentUser: {},
    allUsers: [],
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS:
            return {
                ...state,
                currentUser: action.payload,
            };
        case SEARCH_USER:
            return{
                ...state,
                allUsers: action.payload,
            };
        default:
            return state;
    }
};

export default UserReducer;
