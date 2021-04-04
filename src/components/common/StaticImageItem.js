import React, {useEffect,useRef} from 'react';
import {StyleSheet, Image, Easing,Animated} from 'react-native';
import layout from "../../constants/layout";
import {ScaleAnimatedView} from "./ScaleAnimatedView";

export const StaticImageItem = ({indexToAnimate, item}) => {

    return (
        <ScaleAnimatedView style={styles.imageContainer} indexToAnimate={indexToAnimate}>
            <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
        </ScaleAnimatedView>
    );

};

const styles = StyleSheet.create({
    imageContainer: {
        ...layout.shadowBase,
        marginVertical: 7,
        marginHorizontal: 7,
        borderRadius: 20,
    },
    imageStyle: {
        width: layout.width * 0.40,
        height: layout.height * 0.12,
        borderRadius: 20,
    },
});
