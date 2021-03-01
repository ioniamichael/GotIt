import React, {useState} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {CustomInputText} from '../../components/CustomInputText';
import {YellowButton} from '../../components/YellowButton';
import {isValidEmail, isValidPassword} from '../../utils';
import {login} from '../../services/userService';
import {PopUp} from '../../components/PopUp';
import string from '../../constants/strings';
import icon from '../../constants/icons';
import assets from '../../constants/assets';
import layout from '../../constants/layout';
import colors from '../../constants/colors';

const INITIAL_STATE = {
    userEmail: '',
    userPassword: '',
    showPopUp: false,
    errorMessage: '',
};

export const LoginScreen = ({navigation}) => {

    const [state, setState] = useState(INITIAL_STATE);

    const onLoginButtonPressed = async () => {
        if (isValidEmail(state.userEmail) && isValidPassword(state.userPassword)) {
            try {
                await login(state.userEmail, state.userPassword);
                // navigation.navigate('SplashScreen')
            } catch (e) {
                console.log(e);
                setState((prevState) => ({...prevState, showPopUp: true}));
                setState((prevState) => ({...prevState, errorMessage: e.toString()}));
                setTimeout(() => {
                    setState((prevState) => ({...prevState, showPopUp: false}));
                    setState((prevState) => ({...prevState, errorMessage: ''}));
                }, 3000);
            }
        }
    };


    const onForgotPasswordPressed = () => {
        if (state.userEmail) {
            console.log('forgot password pressed');
        } else {
            alert('Please check you email.');
        }
    };

    return (
        <ImageBackground style={styles.container} source={assets.LOGIN_BACKGROUND_IMAGE}>

            {state.showPopUp && <PopUp errorMessage={state.errorMessage} />}

            <View style={styles.topContainer}>
                <Text style={styles.entryTitle}>{string.LOGIN_SCREEN_TITLE}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <CustomInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'}
                                 value={state.userEmail}
                                 onChangeText={userEmail => setState((prevState) => ({
                                     ...prevState,
                                     userEmail: userEmail,
                                 }))}
                                 placeholder={string.PLACEHOLDER_EMAIL}/>

                <CustomInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                 value={state.userPassword}
                                 onChangeText={userPassword => setState((prevState) => ({...prevState, userPassword}))}
                                 placeholder={string.PLACEHOLDER_PASSWORD}/>


                <TouchableOpacity style={styles.forgotPasswordContainer} activeOpacity={layout.activeOpacity}
                                  onPress={onForgotPasswordPressed}>
                    <Text style={{...layout.regularTextBase}}>{string.FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
                <YellowButton buttonTitle={string.LOGIN} onButtonPressed={onLoginButtonPressed}/>


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
        height: layout.height * 0.5,
        paddingTop: 80,
    },
    bottomContainer: {
        height: layout.height * 0.5,
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
});
