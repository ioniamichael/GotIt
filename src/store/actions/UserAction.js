import {FETCH_USER_DETAILS, SEARCH_USER} from '../types';
import {allUsers, fetchUserDetailsFromDB} from '../../services/userService';

export const fetchUserDetails = () => async (dispatch) => {
    dispatch({
        type: FETCH_USER_DETAILS,
        payload: await fetchUserDetailsFromDB()
    })
};

export const fetchAllUsers = () => async (dispatch)=>{
    dispatch({
        type: SEARCH_USER,
        payload: await allUsers()
    })
};
