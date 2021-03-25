import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, FlatList, Animated, Easing} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageItem} from "../ImageItem";
import layout from '../../constants/layout';
import color from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../../constants/icons';

export const TaskImagePicker = ({images, onImagePicked, onDeleteImage}) => {


    const onDeletePressHandler = (index) => {
            onDeleteImage(index)
    };

    const selectPhotoFromLibrary = () => {
        launchImageLibrary({mediaType: 'photo', includeBase64: true, quality: 0.2}, (res) => {
            if (!res.didCancel) {
                onImagePicked(res.base64);
            }
        });
    };

    return (
        <View style={styles.rootView}>
            <TouchableOpacity style={styles.uploadIconContainer} onPress={selectPhotoFromLibrary}>
                <Text style={{...layout.regularTextBase}}>Upload images.</Text>
                <Ionicons name={icons.ICON_UPLOAD} size={30} color={color.ORANGE}/>
            </TouchableOpacity>

            <FlatList
                data={images}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item + index}
                horizontal
                renderItem={({item, index}) => {
                    return (
                        <ImageItem item={item} onPressDeleteButton={() => onDeletePressHandler(index)} renderedIndex={index}/>
                    );
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    rootView: {
        width: '100%',
        marginBottom: 15,
        borderRadius: 100,
    },
    itemRootView: {...layout.shadowBase, marginVertical: 15, marginEnd: 10, borderRadius: 20,},
    uploadIconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
