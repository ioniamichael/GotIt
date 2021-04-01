import {
    DELETE_TASK,
    FETCH_TASKS,
    SET_SHOW_CREATE_TASK_MODAL,
    SET_SHOW_QUICK_ACTIONS_TASK_MODAL,
    SHOW_LOADER,
    SHOW_POPUP, SHOW_SEARCHED_USER_PROFILE_MODAL,
} from '../types';

const INITIAL_STATE = {
    toShowPopUp: false,
    toShowLoader: false,
    errorMessage: '',
    taskList: [],
    isQuickActionsModalVisible: false,
    isCreateTaskModalVisible: false,
    data: {},
    showSearchedUserProfileModal: false
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
                errorMessage: action.payload.messageText
            };
        case FETCH_TASKS:
            return {
                ...state,
                taskList: action.payload,
            };
        case DELETE_TASK:
            return {
                ...state,
                taskList: state.taskList.filter(t => t.taskCreationDate !== action.payload),
            };
        case SET_SHOW_QUICK_ACTIONS_TASK_MODAL:
            return{
                ...state,
                isQuickActionsModalVisible: action.payload
            };
        case SET_SHOW_CREATE_TASK_MODAL:
            return{
                ...state,
                isCreateTaskModalVisible: action.payload
            };
        case SHOW_SEARCHED_USER_PROFILE_MODAL:
            return{
                ...state,
                showSearchedUserProfileModal: action.payload
            };
        default:
            return state;
    }
};




export default GeneralReducer;
