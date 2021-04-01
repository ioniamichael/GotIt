import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import icons from '../../constants/icons';
import assets from "../../constants/assets";

export const ImagePicker = ({image, onImagePicked, isDisabled}) => {

    const selectPhotoFromLibrary = () => {
        launchImageLibrary({mediaType: 'photo', includeBase64: true, quality: 0.2}, (res) => {
            onImagePicked(res.base64);
        });
    };

    return (
        <View>
            <TouchableOpacity disabled={isDisabled} activeOpacity={layout.activeOpacity} style={styles.rootView}
                              onPress={selectPhotoFromLibrary}>

                <Image source={image ? {uri: `data:image/jpeg;base64,${image}`} : assets.USER_AVATAR_PLACEHOLDER} style={styles.imageStyle} />

            </TouchableOpacity>
            {!isDisabled && <View style={styles.uploadIconContainer}>
                <Ionicons name={icons.ICON_UPLOAD} size={16} color={color.GREEN}/>
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    rootView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        backgroundColor:color.GREEN,
        height: 120,
        borderRadius: 100,
        ...layout.shadowBase,
    },
    uploadIconContainer: {
        position: 'absolute',
        elevation: 4,
        bottom: 5,
        left: 5,
        zIndex: 5,
        backgroundColor: color.DARK_GREY,
        borderRadius: 100,
        padding: 4,
        borderColor: color.YELLOW,
        borderWidth: 1,
    },
    imageStyle: {
        width: 110,
        height: 110,
        resizeMode: 'cover',
        borderRadius: 100
    },
    animationContainer:{
        width:120,
        height:120,
        borderRadius:100,
        overflow:'hidden'
    },
    avatarPlaceholder:{
        width:120,
        height:120,
    }
});
