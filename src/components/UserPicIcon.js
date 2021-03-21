import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

export const UserPicIcon = () => {

    const user = useSelector(state => state.UserReducer.userDetails);
    const userImage = user.image;


    return (
        <View>
            <Image source={{uri: `data:image/jpeg;base64,${userImage}`}} style={styles.userImageStyle}/>
        </View>
    );
};

const styles = StyleSheet.create({
    userImageStyle: {
        width: 30,
        height: 30,
        borderRadius: 100,
    },
});
