import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../../constants/layout';
import color from '../../constants/colors';

export const CustomTextInput = ({value, onChangeText, placeholder, icon, isSecure, keyboardType}) => {

    return (
        <View style={styles.container}>

            <Ionicons style={styles.iconStyle} name={icon} size={layout.defaultIconSize} color={color.YELLOW}/>

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
        borderColor: color.YELLOW,
        paddingHorizontal: 20,
        backgroundColor: color.TRANSPARENT_WHITE,
        flexDirection: 'row',
        marginBottom: 15,
    },
    iconStyle: {
        alignSelf: 'center',
        marginEnd: 15,
    },
    textInputStyle: {
        flex: 1,
        ...layout.regularTextBase,
        fontSize: 14,
    },
});
