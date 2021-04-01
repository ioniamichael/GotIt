import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {fetchUserDetails} from '../store/actions/UserAction';
import {fetchTasks} from '../store/actions/GeneralActions';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import assets from '../constants/assets';
import screens from '../constants/screens';
import layout from '../constants/layout';


export const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();
    let unsubscribe;


    const checkUserState = () => {
        try {
            unsubscribe = auth().onAuthStateChanged(async (user) => {
                if (user) {
                    await dispatch(fetchUserDetails());
                    await dispatch(fetchTasks());
                    navigation.navigate(screens.HOME_SCREEN);
                } else {
                    navigation.navigate(screens.ENTRY_SCREEN);
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lottie: {
        width:layout.width * 0.4,
        height:layout.width * 0.4,
    },
});
