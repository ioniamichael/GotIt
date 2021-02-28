import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../constants/layout';

export const CustomInputText = ({value, onChangeText, placeholder, icon, isSecure, keyboardType}) => {
    return (
        <View style={styles.container}>

            <Ionicons style={styles.iconStyle} name={icon} size={layout.defaultIconSize}/>

            <TextInput
                style={styles.textInputStyle}
                autoCapitalize={'none'}
                autoCompleteType={'off'}
                autoCorrect={false}
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
        flexDirection: 'row',
    },
    iconStyle: {},
    textInputStyle: {},
});
