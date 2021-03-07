import React, {useState} from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {LoginInputText} from '../../components/LoginInputText';
import {YellowButton} from '../../components/YellowButton';
import {isValidEmail, isValidPassword} from '../../utils';
import {login} from '../../services/userService';
import {setShowLoader} from '../../store/actions/GeneralActions';
import {Loader} from '../../components/Loader';
import string from '../../constants/strings';
import icon from '../../constants/icons';
import assets from '../../constants/assets';
import layout from '../../constants/layout';
import colors from '../../constants/colors';
import appConfig from '../../constants/appConfig';
import {useDispatch, useSelector} from 'react-redux';
import screens from '../../constants/screens';


const INITIAL_STATE = {
    userEmail: '',
    userPassword: '',
};

export const LoginScreen = ({navigation}) => {

    const [state, setState] = useState(INITIAL_STATE);
    const dispatch = useDispatch();
    const isLoaderShown = useSelector(state => state.GeneralReducer.toShowLoader);

    const onLoginButtonPressed = async () => {
        if (isValidEmail(state.userEmail) && isValidPassword(state.userPassword)) {
            dispatch(setShowLoader(true));
            try {
                await login(state.userEmail, state.userPassword);
                dispatch(setShowLoader(false));
                navigation.navigate(screens.SPLASH_SCREEN)
            } catch (e) {
                setTimeout(() => {
                    dispatch(setShowLoader(false));
                }, appConfig.MODAL_VISIBILITY_TIME_IN_MILLISECONDS);
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

            <Loader isVisible={isLoaderShown}/>

            <View style={styles.topContainer}>
                <Text style={styles.entryTitle}>{string.LOGIN_SCREEN_TITLE}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <LoginInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'}
                                value={state.userEmail}
                                onChangeText={userEmail => setState((prevState) => ({
                                     ...prevState,
                                     userEmail: userEmail,
                                 }))}
                                placeholder={string.PLACEHOLDER_EMAIL}/>

                <LoginInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
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
