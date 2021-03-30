import {
    DELETE_TASK,
    FETCH_TASKS,
    SET_SHOW_CREATE_TASK_MODAL,
    SET_SHOW_QUICK_ACTIONS_TASK_MODAL,
    SHOW_LOADER,
    SHOW_POPUP,
} from '../types';

const INITIAL_STATE = {
    toShowPopUp: false,
    toShowLoader: false,
    errorMessage: '',
    taskList: [],
    isQuickActionsModalVisible: false,
    isCreateTaskModalVisible: false,
    data: {}
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
        case DELETE_TASK:
            return {
                ...state,
                taskList: state.taskList.filter(t => t.taskID !== action.payload),
            };
        default:
            return state;
    }
};




export default GeneralReducer;
