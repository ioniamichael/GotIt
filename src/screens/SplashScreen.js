import React, {useState ,useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserDetails} from '../store/actions/UserAction';
import colors from '../constants/colors';
import auth from '@react-native-firebase/auth';

export const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.UserReducer.userDetails);
    let unsubscribe;


    const checkUserState = () => {
        try {
            unsubscribe = auth().onAuthStateChanged(async (user) => {
                if (user) {
                    console.log('::SPLASH logged in ', user);

                } else {
                    console.log('::SPLASH logged out ');
                    navigation.navigate('EntryScreen');
                }
            });
        } catch (e) {
            console.log('::SPLASH ERROR', e);
        }
    };

    useEffect(() => {

        checkUserState();
        dispatch(fetchUserDetails());

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text>{userDetails.userEmail}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.WHITE,
    },
});
