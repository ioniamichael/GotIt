import {SHOW_POPUP, SHOW_LOADER} from '../types';

export const setShowLoader = (toShowLoader) => (dispatch) => {
    dispatch({
        type: SHOW_LOADER,
        payload: toShowLoader,
    });
};

export const setShowPopUp = (toShowPopUp, messageText) => (dispatch) => {
    dispatch({
        type: SHOW_POPUP,
        payload: toShowPopUp, messageText,
    });
};
