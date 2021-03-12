import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../../constants/layout';
import color from '../../constants/colors';

export const CustomTextInput = ({value, onChangeText, placeholder, icon, isSecure, keyboardType}) => {

    return (
        <View style={styles.container}>

            <Ionicons style={styles.iconStyle} name={icon} size={layout.defaultIconSize} color={color.ORANGE}/>

            <TextInput
                style={styles.textInputStyle}
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
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        marginBottom: 20,
        paddingHorizontal: 20,
        borderColor: color.ORANGE,
        backgroundColor: color.TRANSPARENT_WHITE,
        flexDirection: 'row',
    },
    iconStyle: {
        alignSelf: 'center',
    },
    textInputStyle: {
        flex: 1,
        ...layout.regularTextBase,
        fontSize: 14,
    },
});
