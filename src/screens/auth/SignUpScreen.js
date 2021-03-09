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

    return (
        <View style={styles.container}>

            <Loader isVisible={isLoaderShown}/>

            <Text style={styles.entryTitle}>GotIt</Text>
            <Text style={{...layout.regularTextBase}}>{string.SIGN_UP_SCREEN_TITLE}</Text>

            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <ImagePicker image={state.image} onImagePicked={image => setState((prevState) => ({
                        ...prevState,
                        image
                    }))}/>

                    <Text style={{...layout.regularTextBase, fontSize: 12, marginStart: 20}}>Please upload your avatar{'\n'}(Required)</Text>
                </View>

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

            </View>


            <YellowButton buttonTitle={string.SIGN_UP_BUTTON} onButtonPressed={onSignUpButtonPressed}/>


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
