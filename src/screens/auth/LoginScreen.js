import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView} from 'react-native';
import {LoginInputText} from '../../components/Auth/LoginInputText';
import {AcceptButton} from '../../components/common/AcceptButton';
import {isValidEmail, isValidPassword} from '../../utils';
import {login} from '../../services/userService';
import {setShowLoader, setShowPopUp} from '../../store/actions/GeneralActions';
import {MainLoader} from '../../components/Loaders/MainLoader';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import string from '../../constants/strings';
import icon from '../../constants/icons';
import assets from '../../constants/assets';
import layout from '../../constants/layout';
import colors from '../../constants/colors';
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

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const onLoginButtonPressed = async () => {
        if (isValidEmail(state.userEmail) && isValidPassword(state.userPassword)) {
            dispatch(setShowLoader(true));
            try {
                await login(state.userEmail, state.userPassword);
                dispatch(setShowLoader(false));
                navigation.navigate(screens.SPLASH_SCREEN);
            } catch (e) {
                dispatch(setShowLoader(false));
                dispatch(setShowPopUp(true, e.toString()));
            }
        } else {
            if (!isValidEmail(state.userEmail)) {
                setEmailError('Invalid email format');
                setTimeout(() => {
                    setEmailError('');
                }, 3000);
            }
            if (!isValidPassword(state.userPassword)) {
                setPasswordError('Password should be at least 6 chars');
                setTimeout(() => {
                    setPasswordError('');
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
        <KeyboardAwareScrollView
            resetScrollToCoords={{x: 0, y: 0}}
            scrollEnabled={false}
            contentContainerStyle={styles.container}>

            <MainLoader isVisible={isLoaderShown}/>


            <View style={styles.logoContainer}>
                <Image source={assets.APP_LOGO} style={styles.logo}/>
                <Text style={styles.regularText}>{string.LOGIN_SCREEN_TITLE}</Text>
            </View>

            <View style={styles.innerContainer}>

                <LoginInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'}
                                value={state.userEmail}
                                onChangeText={userEmail => setState((prevState) => ({
                                    ...prevState,
                                    userEmail: userEmail,
                                }))}
                                placeholder={string.PLACEHOLDER_EMAIL}
                                errorMessage={emailError}/>

                <LoginInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                value={state.userPassword}
                                onChangeText={userPassword => setState((prevState) => ({...prevState, userPassword}))}
                                placeholder={string.PLACEHOLDER_PASSWORD}
                                errorMessage={passwordError}/>


                <TouchableOpacity style={styles.forgotPasswordContainer} activeOpacity={layout.activeOpacity}
                                  onPress={onForgotPasswordPressed}>
                    <Text style={styles.regularText}>{string.FORGOT_PASSWORD}</Text>
                </TouchableOpacity>
                <AcceptButton buttonTitle={string.LOGIN} onButtonPressed={onLoginButtonPressed}/>
            </View>


        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: layout.defaultPaddingSize,
        width: layout.width,
        height: layout.height,
        backgroundColor: colors.WHITE,
    },
    innerContainer: {
        justifyContent: 'center',
        backgroundColor: colors.WHITE,
        alignItems: 'center',
        flex: 1,
    },
    entryTitle: {
        fontFamily: 'Montserrat-Bold',
        color: colors.DARK_GREY,
        fontSize: 30,
    },
    forgotPasswordContainer: {
        marginBottom: 30,
        alignSelf: 'flex-end',
    },
    logoContainer: {
        marginTop: 30,
    },
    logo: {marginStart: -20, width: 90, height: 40},
    regularText:{...layout.regularTextBase}
});
