import auth from '@react-native-firebase/auth';

export const fetUserDetailsService = () => {
    return{
        userName: 'Michael',
        userEmail: 'ioniamichael@gmail.com',
        userAvatar: 'https://relayfm.s3.amazonaws.com/uploads/user/avatar/5/user_avatar_stephenhackett_artwork.png',
    }
};

export const login = (email, password) => new Promise(async (resolve, reject) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
        resolve();
    } catch (e) {
        reject(e);
        console.log(e)
    }
});
