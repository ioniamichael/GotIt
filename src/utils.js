export const getCurrentDateInTimestamp = () => {
    const currentDate = new Date();
    return currentDate.getTime();
};

export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
