import {SHOW_POPUP, SHOW_LOADER, FETCH_TASKS, DELETE_TASK} from '../types';
import {fetchAllTasksFromDB} from '../../services/userService';

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

export const fetchTasks = () => async (dispatch) => {
    dispatch({
        type: FETCH_TASKS,
        payload: await fetchAllTasksFromDB(),
    });
};

export const deleteTask = (task) => (dispatch) => {
    dispatch({
        type: DELETE_TASK,
        payload: task
    })
};

