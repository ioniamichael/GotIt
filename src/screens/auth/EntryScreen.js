import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image} from 'react-native';
import {AcceptButton} from '../../components/common/AcceptButton';
import colors from '../../constants/colors';
import string from '../../constants/strings';
import layout from '../../constants/layout';
import assets from '../../constants/assets';
import screens from '../../constants/screens';


export const EntryScreen = ({navigation}) => {

    const navigateToLoginScreen = () => navigation.navigate(screens.LOGIN_SCREEN);
    const navigateToSignUpScreen = () => navigation.navigate(screens.SIGN_UP_SCREEN);

    return (
        <ImageBackground style={styles.container} source={assets.BACKGROUND_IMAGE}>

            <View style={styles.logoContainer}>
                <Image source={assets.APP_LOGO} style={styles.logo}/>
                <Text style={styles.regularText}>{string.ENTRY_SUBTITLE}</Text>
            </View>

            <View style={styles.centerContainer}>
                <AcceptButton buttonTitle={string.START_BUTTON} onButtonPressed={navigateToSignUpScreen}/>
                <View style={styles.haveAccountContainer}>
                    <Text style={styles.haveAccTextStyle}>{string.HAVE_ACCOUNT}</Text>
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
        padding: layout.defaultPaddingSize,
        width: layout.width,
        height: layout.height,
        backgroundColor: colors.WHITE,
        flex: 1,
    },
    entryTitle: {
        justifyContent: 'flex-start',
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        color: colors.DARK_GREY,
    },
    haveAccountContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    loginButton: {
        marginStart:10,
        ...layout.boldTextBase,
        color: colors.GREEN,
        fontSize: 13,
    },
    logoContainer: {
        marginTop: 30
    },
    logo: {marginStart: -20, width: 90, height: 40},
    regularText: {...layout.regularTextBase},
    centerContainer: {justifyContent: 'center', alignItems: 'center', flex: 1},
    haveAccTextStyle: {...layout.boldTextBase, fontSize: 13,},
});
