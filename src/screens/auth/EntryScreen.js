import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {YellowButton} from '../../components/YellowButton';
import colors from '../../constants/colors';
import string from '../../constants/strings';
import layout from '../../constants/layout';
import assets from '../../constants/assets';
import Ionicons from 'react-native-vector-icons/Ionicons'

export const EntryScreen = ({navigation}) => {

     const navigateToLoginScreen = () => navigation.navigate('LoginScreen');
     const navigateToSignUpScreen = () => navigation.navigate('SignUpScreen');

    return (
        <ImageBackground style={styles.container} source={assets.BACKGROUND_IMAGE}>

            <View style={styles.topContainer}>
                <Text style={styles.entryTitle}>{string.ENTRY_TITLE}</Text>
                <Text style={{...layout.regularTextBase}}>{string.ENTRY_SUBTITLE}</Text>

            </View>

            <View style={styles.bottomContainer}>
                <YellowButton buttonTitle={string.START_BUTTON} onButtonPressed={navigateToSignUpScreen}/>
                <View style={styles.haveAccountContainer}>
                    <Text style={[{...layout.boldTextBase}, {fontSize: 13}]}>{string.HAVE_ACCOUNT}</Text>
                    <TouchableOpacity activeOpacity={layout.activeOpacity} onPress={navigateToLoginScreen}>
                        <Text style={styles.loginButton}>{string.LOGIN}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.WHITE,
        paddingHorizontal: 30,
        flex: 1,
    },
    topContainer: {
        height: '50%',
        justifyContent: 'center'
    },
    bottomContainer: {
        height: '50%',
        alignItems: 'center',
    },
    entryTitle: {
        fontFamily: 'Montserrat-Bold',
        color: colors.TEXT_COLOR,
        fontSize: 30,
        marginBottom: 20,
    },
    haveAccountContainer: {
        flexDirection: 'row',
    },
    loginButton: {
        ...layout.boldTextBase,
        color: colors.YELLOW,
        marginStart: 5,
        fontSize: 13,
    },
});
