import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {fetchUserDetails} from '../store/actions/UserAction';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import assets from '../constants/assets';
import color from '../constants/colors';
import {fetchTasks} from '../store/actions/GeneralActions';

export const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();
    let unsubscribe;


    const checkUserState = () => {
        try {
            unsubscribe = auth().onAuthStateChanged(async (user) => {
                if (user) {
                    await dispatch(fetchUserDetails());
                    dispatch(fetchTasks());
                    setTimeout(() => {
                        navigation.navigate('HomeScreen');
                    }, 3000);

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
            <LottieView style={styles.lottie} source={assets.APP_LOADER} autoPlay loop/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.YELLOW,
        justifyContent:'center',
        alignItems: 'center',
    },
    lottie: {
    },
});
