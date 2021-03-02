import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../constants/colors';
import auth from '@react-native-firebase/auth';
import {fetchUserDetails} from '../store/actions/UserAction';

export const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();
    let unsubscribe;


    const checkUserState = () => {
        try {
            unsubscribe = auth().onAuthStateChanged(async (user) => {
                if (user) {
                    await dispatch(fetchUserDetails());
                    navigation.navigate('HomeScreen');
                } else {
                    navigation.navigate('EntryScreen');
                }
            });
        } catch (e) {
            console.log('::SPLASH ERROR', e);
        }
    };

    useEffect(() => {
        checkUserState();
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
});
