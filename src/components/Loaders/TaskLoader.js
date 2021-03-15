import React from 'react';
import {StyleSheet, Modal, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '../../constants/assets';
import layout from '../../constants/layout';

export const TaskLoader = ({isVisible}) => {
    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true} >
            <View
                style={styles.rootView}>
                <LottieView style={styles.lottie} source={assets.TASK_LOADER} autoPlay loop/>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    rootView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffdcb799',
        height: layout.height,
        width: layout.width,
    },
    lottie: {
        width: 70,
        height: 70,
    },
});
