import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '../constants/assets';
import color from '../constants/colors';
import layout from '../constants/layout';


export const NoTasksPlaceHolder = () => {

    return (
        <View style={styles.container}>
            <LottieView style={styles.lottie} source={assets.NO_TASK_PLACEHOLDER_ANIM} autoPlay loop/>
            <Text style={{...layout.boldTextBase, color: color.DARK_GREY}}>No tasks on the horizon!</Text>
            <Text style={{...layout.regularTextBase, color: color.DARK_GREY}}>Add a task or enjoy your day off.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: layout.width,
        paddingBottom: 100,
        height: layout.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 200,
        height: 200,
    },
});
