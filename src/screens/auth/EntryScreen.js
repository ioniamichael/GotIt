import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {YellowButton} from '../../components/YellowButton';
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

                <Text style={styles.entryTitle}>GotIt</Text>
                <Text style={{...layout.regularTextBase}}>{string.ENTRY_SUBTITLE}</Text>

                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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
        color: colors.DARK_GREY
    },
    haveAccountContainer: {
        flexDirection: 'row',
    },
    loginButton: {
        ...layout.boldTextBase,
        color: colors.YELLOW,
        fontSize: 13,
    },
});
