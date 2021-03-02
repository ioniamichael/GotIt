import {FETCH_TASKS, SHOW_LOADER, SHOW_POPUP} from '../types';

const INITIAL_STATE = {
    toShowPopUp: false,
    toShowLoader: false,
    errorMessage: '',
    taskList: [],
};

const GeneralReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                toShowLoader: action.payload,
            };
        case SHOW_POPUP:
            return {
                ...state,
                toShowPopUp: action.payload.toShowPopUp,
                errorMessage: action.payload.errorMessage,
            };
        case FETCH_TASKS:
            return {
                ...state,
                taskList: action.payload,
            };
        default:
            return state;
    }
};

export default GeneralReducer;
