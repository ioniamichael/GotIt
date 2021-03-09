import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../constants/layout';
import color from '../constants/colors';

export const LoginInputText = ({value, onChangeText, placeholder, icon, isSecure, keyboardType}) => {
    return (
        <View style={styles.container}>

            <Ionicons style={styles.iconStyle} name={icon} size={layout.defaultIconSize} color={color.YELLOW}/>

            <TextInput
                style={styles.textInputStyle}
                autoCapitalize={'none'}
                autoCompleteType={'off'}
                autoCorrect={false}
                secureTextEntry={isSecure}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderStyle={styles.textInputStyle}
                value={value}

            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        borderBottomWidth: 0.5,
        borderColor: color.DARK_GREY,
        paddingHorizontal: 10,
        backgroundColor: color.TRANSPARENT_WHITE,
        flexDirection: 'row',
        width: layout.width * 0.75,
        height: 70,
    },
    iconStyle: {
        alignSelf: 'flex-end',
        marginBottom: 10
    },
    textInputStyle: {
        flex: 1,
        ...layout.regularTextBase,
        fontSize: 14,
        alignSelf: 'flex-end',

    },
});
