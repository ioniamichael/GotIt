import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import assets from "../constants/assets";
import {useSelector} from "react-redux";

export const UserAvatar = ()  => {

    const user = useSelector(state => state.UserReducer.currentUser);
    const userImage = user.userDetails.image;

    return(
        <Image source={userImage ? {uri: `data:image/jpeg;base64,${userImage}`} : assets.USER_AVATAR_PLACEHOLDER} style={styles.imageStyle} />
    )
};


const styles=StyleSheet.create({
    imageStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
        borderRadius: 100
    },
});
