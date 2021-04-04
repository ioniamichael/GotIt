import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Image, StyleSheet, View} from 'react-native';

export const ScaleAnimatedView = ({children, indexToAnimate}) => {

    const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(
            anim,
            {
                toValue: 1,
                friction: 6,
                tension: 60,
                delay: indexToAnimate * 50,
                useNativeDriver: true
            }
        ).start();
    });

    const scaleAnim = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const opacity = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });


    return(
        <Animated.View style={{opacity, transform: [{scale: scaleAnim}]}}>
            {children}
        </Animated.View>
    )
};
