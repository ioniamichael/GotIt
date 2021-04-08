import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {LoginInputText} from '../../components/Auth/LoginInputText';
import {AcceptButton} from '../../components/common/AcceptButton';
import {getCurrentDateInTimestamp, isPasswordRepeatedRight, isValidEmail, isValidPassword} from '../../utils';
import {createAccount} from '../../services/userService';
import {setShowLoader, setShowPopUp} from '../../store/actions/GeneralActions';
import {ImagePicker} from '../../components/Auth/ImagePicker';
import {MainLoader} from '../../components/Loaders/MainLoader';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import string from '../../constants/strings';
import icon from '../../constants/icons';
import layout from '../../constants/layout';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import screens from '../../constants/screens';
import assets from '../../constants/assets';


const INITIAL_STATE = {
    userEmail: '',
    userPassword: '',
    userRepeatPassword: '',
    accountCreationDate: getCurrentDateInTimestamp(),
    userName: '',
    image: null,
};

export const SignUpScreen = ({navigation}) => {

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordRepeatedRightError, setPasswordRepeatedRightError] = useState('');

    const [state, setState] = useState(INITIAL_STATE);
    const dispatch = useDispatch();
    const isLoaderShown = useSelector(state => state.GeneralReducer.toShowLoader);

    const onSignUpButtonPressed = async () => {
        if (isValidEmail(state.userEmail) && isValidPassword(state.userPassword) && state.userName && isPasswordRepeatedRight(state.userPassword, state.userRepeatPassword)) {
            dispatch(setShowLoader(true));
            try {
                await createAccount(state.userEmail, state.userPassword, state.userName, state.image);
                dispatch(setShowLoader(false));
                navigation.navigate(screens.SPLASH_SCREEN);
            } catch (e) {
                console.log(e);
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
            if (!state.userName) {
                setNameError('Please add you name');
                setTimeout(() => {
                    setNameError('');
                }, 3000);
            }
            if (!isPasswordRepeatedRight(state.userPassword, state.userRepeatPassword)) {
                setPasswordRepeatedRightError('Password not match');
                setTimeout(() => {
                    setPasswordRepeatedRightError('');
                }, 3000);
            }
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
                <Text style={styles.regularText}>{string.SIGN_UP_SCREEN_TITLE}</Text>
            </View>

            <View style={styles.innerContainer}>

                <View style={styles.imagePickerContainer}>
                    <ImagePicker isDisabled={false} image={state.image}
                                 onImagePicked={image => setState((prevState) => ({
                                     ...prevState,
                                     image,
                                 }))}/>

                    <Text style={styles.uploadAvatarTextStyle}>{string.PLEASE_UPLOAD_AVATAR}</Text>
                </View>

                <LoginInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'}
                                value={state.userEmail}
                                onChangeText={userEmail => setState((prevState) => ({
                                    ...prevState,
                                    userEmail,
                                }))}
                                placeholder={string.PLACEHOLDER_EMAIL} errorMessage={emailError}/>

                <LoginInputText icon={icon.ICON_NAME} isSecure={false} keyboardType={'default'}
                                value={state.userName}
                                onChangeText={userName => setState((prevState) => ({
                                    ...prevState,
                                    userName,
                                }))}
                                placeholder={string.PLACEHOLDER_NAME} errorMessage={nameError}/>

                <LoginInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                value={state.userPassword}
                                onChangeText={userPassword => setState((prevState) => ({
                                    ...prevState,
                                    userPassword,
                                }))}
                                placeholder={string.PLACEHOLDER_PASSWORD} errorMessage={passwordError}/>

                <LoginInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                value={state.userRepeatPassword}
                                onChangeText={userRepeatPassword => setState((prevState) => ({
                                    ...prevState,
                                    userRepeatPassword,
                                }))}
                                placeholder={string.PLACEHOLDER_REPEAT_PASSWORD}
                                errorMessage={passwordRepeatedRightError}/>

                <View style={styles.buttonContainer}>
                    <AcceptButton buttonTitle={string.SIGN_UP_BUTTON} onButtonPressed={onSignUpButtonPressed}/>
                </View>

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
    imagePickerContainer: {flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', bottom: 10},
    buttonContainer: {marginTop: 20},
    uploadAvatarTextStyle: {
        ...layout.regularTextBase,
        fontSize: 12,
        marginStart: 20,
    },
    regularText: {...layout.regularTextBase}
});
