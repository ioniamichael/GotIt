import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../constants/layout';
import color from '../constants/colors';

export const CustomInputText = ({value, onChangeText, placeholder, icon, isSecure, keyboardType}) => {
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
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 100,
        borderColor: color.YELLOW,
        paddingHorizontal: 20,
        marginVertical: 7.5,
        flexDirection: 'row',
        backgroundColor: color.WHITE,
        width: layout.width * 0.75,
    },
    iconStyle: {alignSelf: 'center', marginEnd: 15},
    textInputStyle: {flex: 1},
});
