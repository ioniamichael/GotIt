import assets from './constants/assets';

export const getCurrentDateInTimestamp = () => {
    const currentDate = new Date();
    return currentDate.getTime();
};

export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
    return password.length > 5;
};

export const isPasswordRepeatedRight = (password, repeatedPassword) => {
    return password === repeatedPassword;
};

export const isEmptyField = (fieldString) => {
    return fieldString.toString().length > 0;
};

export const getTaskImageByType = (type) => {
    for (let i = 0; i < assets.PICKER.length; i++) {
        if (assets.PICKER[i].TYPE === type){
            return assets.PICKER[i].IMAGE;
        }
    }
};

export const getTaskTypeTitleByType = (type) => {
    for (let i = 0; i < assets.PICKER.length; i++) {
        if (assets.PICKER[i].TYPE === type){
            return assets.PICKER[i].title;
        }
    }
};

export const getHoursAndMinutes = (time) => {
    const date = new Date(time);
    let ampm = 'am';
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 10){
        hour = `0${date.getHours()}`;
    }
    if (hour > 11){
        ampm = 'pm';
    }
    if (minutes < 10){
        minutes = `0${date.getMinutes()}`;
    }
    return `${hour}:${minutes}${ampm}`
};
