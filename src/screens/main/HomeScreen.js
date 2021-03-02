import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

export const HomeScreen = ({}) => {

    const userDetails = useSelector(state => state.UserReducer.userDetails);

    return (
        <View>
            <Text>{userDetails.name}</Text>
            <Text>{userDetails.userID}</Text>
            <Image style={{width: 100, height: 100}} source={{uri: userDetails.photoURL}} />
        </View>
    );
};

const styles = StyleSheet.create({});
