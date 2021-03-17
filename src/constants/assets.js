import {BABY, BAR, BIRTHDAY, CALL, GYM, MONEY, SCHOOL, SUPERMARKET, WORK} from '../pickerTypes';

export default {
    BACKGROUND_IMAGE: require('../assets/background.jpg'),
    LOGIN_BACKGROUND_IMAGE: require('../assets/loginBackground.jpg'),
    APP_LOADER: require('../assets/loader.json'),
    NO_TASK_PLACEHOLDER_ANIM: require('../assets/noTask'),
    TASK_LOADER: require('../assets/app_loader_orange'),
    ADD_TASK_BUTTON: require('../assets/plus.png'),
    IMAGE_UPLOAD: require('../assets/image_upload.png'),
    APP_LOGO: require('../assets/app_logo.png'),
    PICKER: [
        {TYPE: BABY, IMAGE: require('../assets/pickerImages/baby.png'), title: 'Baby'},
        {TYPE: BAR, IMAGE: require('../assets/pickerImages/bar.png'), title: 'Cocktails'},
        {TYPE: BIRTHDAY, IMAGE: require('../assets/pickerImages/birthday.png'), title: 'Birthday'},
        {TYPE: CALL, IMAGE: require('../assets/pickerImages/call.png'), title: 'Call'},
        {TYPE: GYM, IMAGE: require('../assets/pickerImages/gym.png'), title: 'Sport'},
        {TYPE: MONEY, IMAGE: require('../assets/pickerImages/money.png'), title: 'Money'},
        {TYPE: SCHOOL, IMAGE: require('../assets/pickerImages/school.png'), title: 'School'},
        {TYPE: SUPERMARKET, IMAGE: require('../assets/pickerImages/supermarket.png'), title: 'Supermarket'},
        {TYPE: WORK, IMAGE: require('../assets/pickerImages/work.png'), title: 'Work'},
    ],
};


