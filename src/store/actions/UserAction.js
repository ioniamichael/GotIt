import {FETCH_USER_DETAILS} from '../types';
import {fetchUserDetailsFromDB} from '../../services/userService';

export const fetchUserDetails = () => async (dispatch) => {
    dispatch({
        type: FETCH_USER_DETAILS,
        payload: await fetchUserDetailsFromDB()
    })
};
