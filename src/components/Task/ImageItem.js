import React from 'react';
import {StyleSheet, Animated, TouchableOpacity, Easing, Image} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";
import icons from "../../constants/icons";
import color from "../../constants/colors";
import layout from "../../constants/layout";

export const ImageItem = ({item, renderedIndex, onPressDeleteButton}) => {

    let removeAnim = new Animated.Value(1);

    const onDeletePressHandler = () => {
        Animated.timing(
            removeAnim,
            {
                toValue: 0,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start(() => {
            onPressDeleteButton(renderedIndex)
        });
    };

    return (
        <Animated.View
            style={[styles.itemRootView, {transform: [{scale: removeAnim}]}]}>
            <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDeletePressHandler(renderedIndex)}>
                <Ionicons name={icons.ICON_TRASH} size={24} color={color.WHITE}/>
            </TouchableOpacity>

        </Animated.View>
    )
};

const styles = StyleSheet.create({
    itemRootView: {
        ...layout.shadowBase,
        marginVertical: 15,
        marginEnd: 10,
        borderRadius: 20
    },
    imageStyle: {
        width: layout.width * 0.4,
        height: layout.height * 0.12,
        borderRadius: 20,
    },
    deleteButton: {
        position: 'absolute',
        ...layout.shadowBase,
        right: 5,
        top: 5
    }
});
