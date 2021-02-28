import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import layout from '../constants/layout';
import colors from '../constants/colors';

export const YellowButton = ({buttonTitle ,onButtonPressed}) => {
    return(
        <TouchableOpacity style={styles.yellowButton} onPress={onButtonPressed} activeOpacity={layout.activeOpacity}>
            <Text style={{...layout.boldTextBase}}>{buttonTitle}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    yellowButton: {
        marginBottom: 20,
        backgroundColor: colors.YELLOW,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    textInButton: {
        fontWeight: 'bold',
    },
});
