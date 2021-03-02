import {FETCH_USER_DETAILS} from '../types';
import auth from '@react-native-firebase/auth';

export const fetchUserDetails = () => (dispatch) => new Promise(async (resolve, reject) => {
    try {
        const user = await auth().currentUser;
        console.log(user);
        if (user) {
            const userData = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                userID: user.uid,
            };
            dispatch({
                type: FETCH_USER_DETAILS,
                payload: userData
            });
            resolve(userData);
        } else {
            reject();
        }
    } catch (e) {
        reject(e);
    }
});
