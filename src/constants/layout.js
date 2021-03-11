import colors from './colors';
import {Dimensions} from 'react-native';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    regularTextBase: {
        fontSize: 16,
        color: colors.DARK_GREY,
        fontFamily: 'Montserrat-Regular',
    },
    boldTextBase: {
        fontSize: 18,
        color: colors.DARK_GREY,
        fontFamily: 'Montserrat-Bold',
    },
    shadowBase: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    activeOpacity: 0.8,
    defaultIconSize: 24,
    defaultPaddingSize:20
};
