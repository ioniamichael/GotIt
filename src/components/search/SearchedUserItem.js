import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import assets from '../../constants/assets';

export const SearchedUserItem = ({searchedUser, indexToAnimate, onUserPressed}) => {

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
            },
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
        <Animated.View style={[styles.mainContainer, {opacity, transform: [{scale: scaleAnim}]}]}>
            <TouchableOpacity activeOpacity={layout.activeOpacity} style={{flex: 1, flexDirection: 'row'}}
                              onPress={() => onUserPressed(searchedUser)}>

                <View style={styles.rootView}>
                    <Image
                        source={searchedUser.image ? {uri: `data:image/jpeg;base64,${searchedUser.image}`} : assets.USER_AVATAR_PLACEHOLDER}
                        style={styles.userImage}/>
                </View>

                <View style={styles.emailAndNameContainer}>
                    <Text style={{
                        ...layout.boldTextBase,
                        fontSize: 12,
                        color: color.DARK_GREY,
                    }}>{searchedUser.name}</Text>
                    <Text style={{
                        ...layout.regularTextBase,
                        fontSize: 12,
                        color: color.DARK_GREY,
                    }}>{searchedUser.email}</Text>
                </View>

            </TouchableOpacity>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: layout.defaultPaddingSize,
    },
    emailAndNameContainer: {
        justifyContent: 'center',
        marginStart: 10,
    },
    rootView: {
        width: 50,
        height: 50,
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
        width: 50,
        height: 50,
        borderRadius: 100,
    },
});
