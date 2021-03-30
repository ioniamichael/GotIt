import React, {useEffect} from 'react';
import {StyleSheet, Image, Easing,Animated} from 'react-native';
import layout from "../../constants/layout";

export const StaticImageItem = ({indexToAnimate, item}) => {

    const anim = new Animated.Value(0);

    useEffect(() => {
        Animated.spring(
            anim,
            {
                toValue: 1,
                friction: 6,
                tension: 60,
                delay: indexToAnimate * 50,
                useNativeDriver: true,
                easing: Easing.linear
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

    return (
        <Animated.View style={[styles.imageContainer, {opacity, transform: [{scale: scaleAnim}]}]}>
            <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
        </Animated.View>
    );

};

const styles = StyleSheet.create({
    imageContainer: {
        ...layout.shadowBase,
        marginVertical: 7,
        marginHorizontal: 7,
        borderRadius: 20,
    },
    imageStyle: {
        width: layout.width * 0.40,
        height: layout.height * 0.12,
        borderRadius: 20,
    },
});
