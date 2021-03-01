import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import layout from '../constants/layout';
import color from '../constants/colors';

export const PopUp = ({errorMessage}) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={{...layout.regularTextBase}}>{errorMessage}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: layout.width,
        height: layout.height,
        position: 'absolute',
        backgroundColor: color.TRANSPARENT_YELLOW,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer:{
        width: layout.width * 0.9,
        height: layout.width * 0.9,
        borderRadius: 30,
        backgroundColor: color.WHITE,
        ...layout.shadowBase,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
