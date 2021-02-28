import colors from './colors';
import {Dimensions} from 'react-native';

export default {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    regularTextBase:{
        fontSize: 16,
        color: colors.TEXT_COLOR,
        fontFamily: 'Montserrat-Regular'
    },
    boldTextBase:{
        fontSize: 18,
        color: colors.TEXT_COLOR,
        fontFamily: 'Montserrat-Bold'
    },
    activeOpacity: 0.8,
    defaultIconSize: 24
};
