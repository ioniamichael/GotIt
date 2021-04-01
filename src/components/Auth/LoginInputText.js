import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../../constants/layout';
import color from '../../constants/colors';

export const LoginInputText = ({value, onChangeText, placeholder, icon, isSecure, keyboardType, errorMessage}) => {

    const renderError = () => {
        if (errorMessage){
            return(
                <Text style={{...layout.regularTextBase, fontSize: 12, color: 'red', position: 'absolute', paddingHorizontal: 10}}>{errorMessage}</Text>
            )
        }
    };

    return (
       <View>

           {renderError()}

           <View style={styles.container}>

               <Ionicons style={styles.iconStyle} name={icon} size={layout.defaultIconSize} color={color.GREEN}/>

               <TextInput
                   style={styles.textInputStyle}
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
       </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderColor: color.DARK_GREY,
        paddingHorizontal: 10,
        backgroundColor: color.TRANSPARENT_WHITE,
        flexDirection: 'row',
        width: layout.width * 0.75,
        height: 70,
    },
    iconStyle: {
        alignSelf: 'center',
    },
    textInputStyle: {
        height:'100%',
        flex:1,
        ...layout.regularTextBase,
        fontSize: 14,
        alignSelf: 'center',
        marginStart: 10,
    },
});
