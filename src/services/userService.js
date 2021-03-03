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

export const createAccount = (email, password, name) => new Promise(async (resolve, reject) => {
    try {
        const result = await auth().createUserWithEmailAndPassword(email, password);
        if (result) {
            await auth().currentUser.updateProfile({
                displayName: name,
                photoURL: 'https://pagesix.com/wp-content/uploads/sites/3/2019/09/ashton-kutcher.jpg?quality=80&strip=all',
            });
            resolve();
        } else {
            reject();
        }
    } catch (e) {
        reject(e);
    }
});

export const setUserDataToDB = (name, accountCreateDate, email) => new Promise(async (resolve, reject) => {
    try {
        await database().ref(firebaseRefs.USERS_REF).child(auth().currentUser.uid).child(firebaseRefs.CURRENT_USER_DETAILS).set({
            name,
            accountCreateDate,
            email,
        });
        resolve();
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

export const fetchAllTasksFromDB = () => new Promise(async (resolve, reject) => {
    try {
        const snapshot = await database().ref('tasks').child(auth().currentUser.uid).once('value');
        if (snapshot.exists) {
            const data = snapshot.val();
            if (data) {
                const tasks = Object.keys(data).map(key => ({...data[key], id: key}));
                resolve(tasks);
            }
        } else {
            resolve(snapshot);
        }
    } catch (e) {
        reject(e);
    }
});

export const removeTaskFromDB = (taskID) => new Promise(async (resolve, reject) => {
    try {
        await database().ref('tasks').child(auth().currentUser.uid).child(taskID).remove();
        resolve();
    }catch (e) {
        reject(e);
    }
});
