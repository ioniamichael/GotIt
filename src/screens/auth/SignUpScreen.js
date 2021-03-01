import React, {useState} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {CustomInputText} from '../../components/CustomInputText';
import {YellowButton} from '../../components/YellowButton';
import {getCurrentDateInTimestamp} from '../../utils';
import string from '../../constants/strings';
import icon from '../../constants/icons';
import assets from '../../constants/assets';
import layout from '../../constants/layout';
import colors from '../../constants/colors';

const INITIAL_STATE = {
    userEmail: '',
    userPassword: '',
    userRepeatPassword: '',
    accountCreationDate: getCurrentDateInTimestamp(),
    userName: '',

};

export const SignUpScreen = ({}) => {

    const [state, setState] = useState(INITIAL_STATE);

    const onSignUpButtonPressed = () => {
        if (state.userEmail && state.userPassword) {
            console.log('signup pressed');
        } else {
            alert('Please check you email/password.');
        }
    };

    return (
        <ImageBackground style={styles.container} source={assets.LOGIN_BACKGROUND_IMAGE}>

            <View style={styles.topContainer}>
                <Text style={styles.entryTitle}>{string.LOGIN_SCREEN_TITLE}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <CustomInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'}
                                 value={state.userEmail}
                                 onChangeText={userEmail => setState((prevState) => ({
                                     ...prevState,
                                     userEmail,
                                 }))}
                                 placeholder={string.PLACEHOLDER_EMAIL}/>

                <CustomInputText icon={icon.ICON_NAME} isSecure={false} keyboardType={'default'}
                                 value={state.userName}
                                 onChangeText={userName => setState((prevState) => ({
                                     ...prevState,
                                     userName,
                                 }))}
                                 placeholder={string.PLACEHOLDER_NAME}/>

                <CustomInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                 value={state.userPassword}
                                 onChangeText={userPassword => setState((prevState) => ({
                                     ...prevState,
                                     userPassword,
                                 }))}
                                 placeholder={string.PLACEHOLDER_PASSWORD}/>

                <CustomInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                 value={state.userRepeatPassword}
                                 onChangeText={userRepeatPassword => setState((prevState) => ({
                                     ...prevState,
                                     userRepeatPassword,
                                 }))}
                                 placeholder={string.PLACEHOLDER_REPEAT_PASSWORD}/>

                <View style={styles.yellowButtonContainer}>
                    <YellowButton buttonTitle={string.SIGN_UP_BUTTON} onButtonPressed={onSignUpButtonPressed}/>
                </View>

            </View>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    topContainer: {
        height: layout.height * 0.4,
        paddingTop: 80,
    },
    bottomContainer: {
        height: layout.height * 0.6,
        alignItems: 'center',
    },
    entryTitle: {
        fontFamily: 'Montserrat-Bold',
        color: colors.TEXT_COLOR,
        fontSize: 30,
        marginBottom: 20,
    },
    forgotPasswordContainer: {
        marginBottom: 40,
        marginEnd: 20,
        alignSelf: 'flex-end',
    },
    yellowButtonContainer:{
        marginVertical: 10
    }
});
