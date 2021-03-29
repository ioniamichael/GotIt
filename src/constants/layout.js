import colors from './colors';
import {Dimensions} from 'react-native';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    regularTextBase: {
        fontSize: 12,
        color: colors.DARK_GREY,
        fontFamily: 'Montserrat-Regular',
    },
    boldTextBase: {
        fontSize: 16,
        color: colors.DARK_GREY,
        fontFamily: 'Montserrat-Bold',
    },
    shadowOfPinnedItem:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    shadowBase: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    activeOpacity: 0.8,
    defaultIconSize: 24,
    defaultPaddingSize:20,
};
