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

export const getTaskImageByType = (type) => {
    switch (type) {
        case 'TYPE 1':
            return(
                require('./assets/pickerImages/icon1.png')
            );
        case 'TYPE 2':
            return(
                require('./assets/pickerImages/icon2.png')
            );
        case 'TYPE 3':
            return(
                require('./assets/pickerImages/icon3.png')
            );
        case 'TYPE 4':
            return(
                require('./assets/pickerImages/icon1.png')
            );
        case 'TYPE 5':
            return(
                require('./assets/pickerImages/icon2.png')
            );
        case 'TYPE 6':
            return(
                require('./assets/pickerImages/icon3.png')
            );
        case 'TYPE 7':
            return(
                require('./assets/pickerImages/icon1.png')
            );
        case 'TYPE 8':
            return(
                require('./assets/pickerImages/icon2.png')
            );
        case 'TYPE 9':
            return(
                require('./assets/pickerImages/icon3.png')
            );

    }
};
