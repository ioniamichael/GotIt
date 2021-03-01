import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import layout from '../constants/layout';
import color from '../constants/colors';

export const Loader = ({isVisible}) => {
    return(
        <Modal visible={isVisible} animationType='fade' transparent onRequestClose={() => {}}>
            <View style={styles.container}>
                <ActivityIndicator size="small" color={color.WHITE} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: layout.width,
        height: layout.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.TRANSPARENT_YELLOW
    }
});
