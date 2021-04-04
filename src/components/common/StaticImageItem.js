import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import layout from '../../constants/layout';
import {ScaleAnimatedView} from './ScaleAnimatedView';

export const StaticImageItem = ({indexToAnimate, item}) => {

    return (
        <ScaleAnimatedView indexToAnimate={indexToAnimate}>
            <View style={styles.imageContainer}>
                <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
            </View>
        </ScaleAnimatedView>
    );

};

const styles = StyleSheet.create({
    imageContainer: {
        ...layout.shadowBase,
        margin: 7,
        borderRadius: 20,
    },
    imageStyle: {
        width: layout.width * 0.40,
        height: layout.height * 0.12,
        borderRadius: 20,
    },
});
