import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CustomInputText} from '../../components/CustomInputText';
import string from '../../constants/strings';
import icon from '../../constants/icons';

const INITIAL_STATE = {
    userName: '',
    userPassword: '',
};

export const LoginScreen = ({}) => {

    const [state, setState] = useState(INITIAL_STATE);

    return (
        <View style={styles.container}>
            <CustomInputText icon={icon.ICON_EMAIL} isSecure={false} keyboardType={'default'} value={state.userName}
                             onChangeText={userName => setState((prevState) => ({...prevState, userName}))}
                             placeholder={string.PLACEHOLDER_EMAIL}/>

            <CustomInputText icon={icon.ICON_PASSWORD} isSecure={true} keyboardType={'default'} value={state.userPassword}
                             onChangeText={userPassword => setState((prevState) => ({...prevState, userPassword}))}
                             placeholder={string.PLACEHOLDER_PASSWORD}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
