import {SHOW_LOADER, SHOW_POPUP} from '../types';

const INITIAL_STATE = {
    toShowPopUp: false,
    toShowLoader: false,
    errorMessage: '',
};

const GeneralReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                toShowLoader: action.payload,
            };
        case SHOW_POPUP:
            return{
                ...state,
                toShowPopUp: action.payload.toShowPopUp,
                errorMessage: action.payload.errorMessage,
            };
        default:
            return state;
    }
};

export default GeneralReducer;
