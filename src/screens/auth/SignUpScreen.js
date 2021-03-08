import React, {useState} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import {LoginInputText} from '../../components/LoginInputText';
import {YellowButton} from '../../components/YellowButton';
import {getCurrentDateInTimestamp} from '../../utils';
import {createAccount} from '../../services/userService';
import {Loader} from '../../components/Loader';
import {setShowLoader} from '../../store/actions/GeneralActions';
import string from '../../constants/strings';
import icon from '../../constants/icons';
import assets from '../../constants/assets';
import layout from '../../constants/layout';
import colors from '../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import screens from '../../constants/screens';
import {ImagePicker} from '../../components/ImagePicker';


const INITIAL_STATE = {
    userEmail: '',
    userPassword: '',
    userRepeatPassword: '',
    accountCreationDate: getCurrentDateInTimestamp(),
    userName: '',
    image: null

};

export const SignUpScreen = ({navigation}) => {

    const [state, setState] = useState(INITIAL_STATE);
    const dispatch = useDispatch();
    const isLoaderShown = useSelector(state => state.GeneralReducer.toShowLoader);

    const onSignUpButtonPressed = async () => {
        dispatch(setShowLoader(true));
        try {
            await createAccount(state.userEmail, state.userPassword, state.userName, state.image);
            dispatch(setShowLoader(false));
            navigation.navigate(screens.SPLASH_SCREEN);
        } catch (e) {
            console.log(e);
            dispatch(setShowLoader(false));
        }
    };

    console.log(state.image);

    return (
        <ImageBackground style={styles.container} source={assets.LOGIN_BACKGROUND_IMAGE}>

            <Loader isVisible={isLoaderShown}/>

            <View style={styles.topContainer}>
                <Text style={styles.entryTitle}>{string.LOGIN_SCREEN_TITLE}</Text>
            </View>

            <View style={styles.bottomContainer}>

                <ImagePicker onImagePicked={image => setState((prevState) => ({
                    ...prevState,
                    image
                }))} />

                <LoginInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'}
                                value={state.userEmail}
                                onChangeText={userEmail => setState((prevState) => ({
                                     ...prevState,
                                     userEmail,
                                 }))}
                                placeholder={string.PLACEHOLDER_EMAIL}/>

                <LoginInputText icon={icon.ICON_NAME} isSecure={false} keyboardType={'default'}
                                value={state.userName}
                                onChangeText={userName => setState((prevState) => ({
                                     ...prevState,
                                     userName,
                                 }))}
                                placeholder={string.PLACEHOLDER_NAME}/>

                <LoginInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
                                value={state.userPassword}
                                onChangeText={userPassword => setState((prevState) => ({
                                     ...prevState,
                                     userPassword,
                                 }))}
                                placeholder={string.PLACEHOLDER_PASSWORD}/>

                <LoginInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'}
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
    yellowButtonContainer: {
        marginVertical: 10,
    },
});
