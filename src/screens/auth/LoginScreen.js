import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {LoginInputText} from '../../components/Auth/LoginInputText';
import {YellowButton} from '../../components/YellowButton';
import {isValidEmail, isValidPassword} from '../../utils';
import {login} from '../../services/userService';
import {setShowLoader} from '../../store/actions/GeneralActions';
import {TaskLoader} from '../../components/Loaders/TaskLoader';
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
        <View style={styles.container}>

            <TaskLoader isVisible={isLoaderShown}/>


            <Image source={assets.APP_LOGO} style={{marginStart: -20,width: 90, height: 40}}/>
            <Text style={{...layout.regularTextBase}}>{string.LOGIN_SCREEN_TITLE}</Text>

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
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


        </View>
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
        fontFamily: 'Montserrat-Bold',
        color: colors.DARK_GREY,
        fontSize: 30,
    },
    forgotPasswordContainer: {
        marginBottom: 30,
        alignSelf: 'flex-end',
    },
});
