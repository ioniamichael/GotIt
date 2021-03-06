import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import color from '../../constants/colors';
import layout from '../../constants/layout';

export const TimeAndDatePicker = ({}) => {
    return(
        <TouchableOpacity style={styles.touchableOpacityContainer}>
            <Text style={{...layout.boldTextBase, fontSize: 13}}>7:00am</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    touchableOpacityContainer:{
        width: 80,
        height: 80,
        marginBottom: 20,
        ...layout.shadowBase,
        backgroundColor: color.YELLOW,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
