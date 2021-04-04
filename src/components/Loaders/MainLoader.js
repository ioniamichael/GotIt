import React from 'react';
import {StyleSheet, Modal, View} from 'react-native';
import LottieView from 'lottie-react-native';
import assets from '../../constants/assets';
import layout from '../../constants/layout';
import {BlurView} from "@react-native-community/blur";

export const MainLoader = ({isVisible}) => {

    return (
        <Modal
            visible={isVisible}
            animationType="fade"
            transparent={true} >

            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

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
        height: layout.height,
        width: layout.width,
    },
    lottie: {
        width: 70,
        height: 70,
    },
    absolute:{
        position: 'absolute',
        top:0,
        bottom:0,
        start: 0,
        end: 0
    }
});
