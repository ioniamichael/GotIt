import React, {useEffect} from 'react';
import {StyleSheet, Easing, Text, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '../../constants/assets';
import color from '../../constants/colors';
import layout from '../../constants/layout';


export const NoTasksPlaceHolder = () => {

    const anim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(
            anim,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
    }, []);

    const opacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0,1]
    });

    return (
        <Animated.View style={[styles.container, {opacity}]}>
            <LottieView style={styles.lottie} source={assets.NO_TASK_PLACEHOLDER_ANIM} autoPlay loop/>
            <Text style={styles.titleTextStyle}>No tasks on the horizon!</Text>
            <Text style={styles.subTitleTextStyle}>Add a task or enjoy your day off.</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width: 100,
        height: 100,
    },
    titleTextStyle:{...layout.boldTextBase, color: color.DARK_GREY},
    subTitleTextStyle:{...layout.regularTextBase, color: color.DARK_GREY}

});
