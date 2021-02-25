import {FETCH_USER_DETAILS} from '../types';
import {fetUserDetailsService} from '../../services/userService';

export const fetchUserDetails = () => (dispatch) => {
    dispatch({
        type: FETCH_USER_DETAILS,
        payload: fetUserDetailsService()
    });
};
