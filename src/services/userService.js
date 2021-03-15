import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebaseRefs from '../constants/firebaseRefs';

export const login = (email, password) => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_LOGIN_START');
    try {
        await auth().signInWithEmailAndPassword(email, password);
        console.log(':::SERVICE_LOGIN_SUCCESS');
        resolve();
    } catch (e) {
        reject(e);
        console.log(':::SERVICE_LOGIN_REJECT');
        console.log(e);
    }
});

export const createAccount = (email, password, name, image) => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_CREATE_ACC_START');
    try {
        const result = await auth().createUserWithEmailAndPassword(email, password);
        console.log(':::SERVICE_CREATE_ACC_GETTING_RESULT');
        if (result) {
            await setUserDataToDB(name, email, image);
            console.log(':::SERVICE_CREATE_ACC_SUCCESS');
            resolve();
        } else {
            console.log(':::SERVICE_CREATE_ACC_REJECT_WITH_RESULT');
            reject();
        }
    } catch (e) {
        console.log(':::SERVICE_CREATE_ACC_REJECT');
        reject(e);
    }
});

export const setUserDataToDB = (name, email, image) => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_SET_USER_TO_DB_START');
    try {
        await database().ref(firebaseRefs.USERS_REF).child(auth().currentUser.uid).child(firebaseRefs.CURRENT_USER_DETAILS).set({
            name,
            email,
            image,
        });
        console.log(':::SERVICE_SET_USER_TO_DB_SUCCESS');
        resolve();
    } catch (e) {
        console.log(':::SERVICE_SET_USER_TO_DB_REJECT');
        reject(e);
    }
});

export const fetchUserDetailsFromDB = () => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_FETCH_USER_DETAILS_FROM_DB_START');
    try {
        const snapshot = await database().ref('users').child(auth().currentUser.uid).child('userDetails').once('value');
        if (snapshot.exists) {
            const data = snapshot.val();
            console.log(':::SERVICE_FETCH_USER_DETAILS_FROM_DB_SUCCESS_WITH_DATA');
            resolve(data);
        } else {
            console.log(':::SERVICE_FETCH_USER_DETAILS_FROM_DB_SUCCESS_WITH_OUT_DATA');
            resolve(snapshot.val());
        }
    } catch (e) {

        console.log(':::SERVICE_FETCH_USER_DETAILS_FROM_DB_REJECT');
        reject(e);
    }
});

export const createNewTask = (task) => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_CREATE_NEW_TASK_START');
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(task.taskCreationDate.toString()).set(task);
        console.log(':::SERVICE_CREATE_NEW_TASK_SUCCESS');
        resolve();
    } catch (e) {
        console.log(':::SERVICE_CREATE_NEW_TASK_REJECT');
        reject(e);
    }
});

export const fetchAllTasksFromDB = () => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_FETCH_ALL_TASKS_FROM_DB_START');
    try {
        const snapshot = await database().ref('tasks').child(auth().currentUser.uid).once('value');
        if (snapshot.exists) {
            const data = snapshot.val();
            if (data) {
                const tasks = Object.keys(data).map(key => ({...data[key], id: key}));
                console.log(':::SERVICE_FETCH_ALL_TASKS_FROM_DB_SUCCESS_WITH_TASKS');
                resolve(tasks);
            }
        } else {
            console.log(':::SERVICE_FETCH_ALL_TASKS_FROM_DB_SUCCESS_WITH_OUT_TASKS');
            resolve(snapshot);
        }
    } catch (e) {
        console.log(':::SERVICE_FETCH_ALL_TASKS_FROM_DB_REJECT');
        reject(e);
    }
});

export const setTaskAsFinished = (task) => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_SET_TASK_AS_FINISHED_START');
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(task.taskCreationDate.toString()).child('isFinished').set(!task.isFinished);
        console.log(':::SERVICE_SET_TASK_AS_FINISHED_SUCCESS');
        resolve();
    } catch (e) {
        console.log(':::SERVICE_SET_TASK_AS_FINISHED_REJECT');
        reject(e);
    }
});

export const removeTaskFromDB = (taskID) => new Promise(async (resolve, reject) => {
    console.log(':::SERVICE_REMOVE_TASK_FROM_DB_START');
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(taskID).remove();
        console.log(':::SERVICE_REMOVE_TASK_FROM_DB_SUCCESS');
        resolve();
    } catch (e) {
        console.log(':::SERVICE_REMOVE_TASK_FROM_DB_REJECT');
        reject(e);
    }
});
