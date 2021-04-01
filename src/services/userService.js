import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firebaseRefs from '../constants/firebaseRefs';

export const login = (email, password) => new Promise(async (resolve, reject) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        resolve();
    } catch (e) {
        reject(e);
        console.log(e);
    }
});

export const createAccount = (email, password, name, image) => new Promise(async (resolve, reject) => {
    try {
        const result = await auth().createUserWithEmailAndPassword(email, password);
        if (result) {
            await setUserDataToDB(name, email, image);
            resolve();
        } else {
            reject();
        }
    } catch (e) {
        reject(e);
    }
});

export const setUserDataToDB = (name, email, image) => new Promise(async (resolve, reject) => {
    try {
        await database().ref(firebaseRefs.USERS_REF).child(auth().currentUser.uid).child(firebaseRefs.CURRENT_USER_DETAILS).set({
            name,
            email,
            image,
            id: auth().currentUser.uid
        });
        resolve();
    } catch (e) {
        reject(e);
    }
});

export const fetchUserDetailsFromDB = () => new Promise(async (resolve, reject) => {
    try {
        const snapshot = await database().ref('users').child(auth().currentUser.uid).once('value');
        if (snapshot.exists) {
            const data = snapshot.val();
            resolve(data);
        } else {
            resolve(snapshot.val());
        }
    } catch (e) {
        reject(e);
    }
});

export const createNewTask = (task) => new Promise(async (resolve, reject) => {
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(task.taskCreationDate.toString()).set(task);
        resolve();
    } catch (e) {
        reject(e);
    }
});

export const addToFriends = (userToAdd) => new Promise(async (resolve, reject) => {
    try {
        await database().ref('users').child(auth().currentUser.uid).child('friends').child(userToAdd.userDetails.id).child('friendDetails').set(userToAdd.userDetails);
        resolve();
    }catch (e) {
        reject(e)
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

export const allUsers = () => new Promise(async (resolve, reject) => {
    try{
        const snapshot = await database().ref('users').once('value');
        if (snapshot.exists){
            const data = snapshot.val();
            if (data){
                const users = Object.keys(data).map(key => ({...data[key], id: key}))
                resolve(users)
            } else {
                resolve();
            }
        }else {
            resolve(snapshot)
        }
    }catch (e) {
        reject();
    }
});

export const setTaskAsFinished = (task) => new Promise(async (resolve, reject) => {
    try {
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
