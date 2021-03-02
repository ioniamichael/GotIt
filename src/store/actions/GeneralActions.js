import {SHOW_POPUP, SHOW_LOADER,FETCH_TASKS} from '../types';
import {getCurrentDateInTimestamp} from '../../utils';

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

export const fetchTasks = () => (dispatch) => {
    dispatch({
        type: FETCH_TASKS,
        payload: [
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#1 Title some task title will be appears here in one line ',
                taskDescription: 'Task#1 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '7:00AM',
                subTasks: [],
                isExpired: false,
                isFinished: false,

            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#2 Title',
                taskDescription: 'Task#2 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '8:30AM',
                subTasks: [
                    'Sub task 1 lorem ipsum here appears for few moments cigarete',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: true,
            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#3 Title',
                taskDescription: 'Task#3 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '11:00AM',
                subTasks: [
                    'Sub task 1',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: true,
            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#4 Title',
                taskDescription: 'Task#4 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '1:00PM',
                subTasks: [
                    'Sub task 1',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: false,
            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#5 Title',
                taskDescription: 'Task#5 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '2:20PM',
                subTasks: [
                    'Sub task 1',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: false,
            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#6 Title',
                taskDescription: 'Task#6 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '3:45PM',
                subTasks: [
                    'Sub task 1',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: false,
            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#7 Title',
                taskDescription: 'Task#7 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '6:50PM',
                subTasks: [
                    'Sub task 1',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: false,
            },
            {
                icon: 'pencil-outline',
                taskTitle: 'Task#8 Title',
                taskDescription: 'Task#8 description',
                taskCreationDate: getCurrentDateInTimestamp(),
                taskEndDate: '8:00PM',
                subTasks: [
                    'Sub task 1',
                    'Sub task 2',
                    'Sub task 3',
                    'Sub task 4',
                ],
                isExpired: false,
                isFinished: false,
            },
        ]
    })
}
