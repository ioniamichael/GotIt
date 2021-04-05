import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import layout from '../../constants/layout';
import colors from '../../constants/colors';

export const DeclineButton = ({buttonTitle, onButtonPressed}) => {

    return (
        <TouchableOpacity style={styles.yellowButton}
                          onPress={onButtonPressed} activeOpacity={layout.activeOpacity}>
            <Text style={styles.regularText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    yellowButton: {
        borderRadius:30,
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
        width: 150,
        ...layout.shadowBase,
        backgroundColor:colors.RED,
        justifyContent: 'center',
        ...layout.shadowBase,
    },
    textInButton: {
        fontWeight: 'bold',
    },
    regularText: {...layout.regularTextBase}
});
