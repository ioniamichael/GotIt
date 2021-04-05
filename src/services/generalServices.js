import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export const createNewTask = (task) => new Promise(async (resolve, reject) => {
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(task.taskCreationDate.toString()).set(task);
        resolve();
    } catch (e) {
        reject(e);
    }
});

export const fetchAllTasksFromDB = () => new Promise(async (resolve, reject) => {
    try {
        const snapshot = await database().ref('tasks').child(auth().currentUser.uid).once('value');
        if (snapshot.exists) {
            const data = snapshot.val();
            if (data) {
                const tasks = Object.keys(data).map(key => ({...data[key], id: key}));
                resolve(tasks);
            } else {
                resolve();
            }
        } else {
            resolve(snapshot);
        }
    } catch (e) {
        reject(e);
    }
});

export const setTaskAsFinished = (task) => new Promise(async (resolve, reject) => {
    try {
        console.log('::: is finished => ', task.isFinished);
        await database().ref('tasks').child(auth().currentUser.uid).child(task.taskCreationDate.toString()).child('isFinished').set(!task.isFinished);
        resolve();
    } catch (e) {
        reject(e);
    }
});

export const removeTaskFromDB = (taskID) => new Promise(async (resolve, reject) => {
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(taskID).remove();
        resolve();
    } catch (e) {
        reject(e);
    }
});
