import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserDetails} from '../store/actions/UserAction';
import colors from '../constants/colors';

export const SplashScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.UserReducer.userDetails);

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, []);

    return (
        <View style={styles.container}>
            <Text>{userDetails.userName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.WHITE
    }
});
