import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Animated, Easing} from 'react-native';
import color from "../../constants/colors";
import layout from "../../constants/layout";

export const SearchedUserItem = ({user, indexToAnimate}) => {

    const anim = useRef(new Animated.Value(0)).current;

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
        <Animated.View style={{opacity, transform: [{scale: scaleAnim}]}}>
            <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.rootView}>
                {user.userDetails.image ?
                    <Image source={{uri: `data:image/jpeg;base64,${user.userDetails.image}`}} style={styles.userImage}/>
                    : <Text style={styles.userNameOnPic}>{user.userDetails.name.slice(0, 2)}</Text>}
            </TouchableOpacity>
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    rootView: {
        width: layout.width * 0.18,
        height: layout.width * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: color.GREY,
        borderRadius: 100,
        ...layout.shadowBase,
    },
    userNameOnPic: {
        ...layout.regularTextBase,
        fontSize: 16,
    },
    userImage: {
        width: layout.width * 0.18,
        height: layout.width * 0.18,
        borderRadius: 100,
    }
});
