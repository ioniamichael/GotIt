import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import layout from '../constants/layout';
import color from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import icons from '../constants/icons';

export const ImagePicker = ({onImagePicked}) => {

    const [image, setImage] = useState(null);

    const selectPhotoFromLibrary = () => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true, quality: 0.2 }, (res) => {
            setImage(res.base64);
            onImagePicked(image);
        });
    };


    return (
        <View style={{flexDirection: 'row',}}>
            <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.rootView} onPress={selectPhotoFromLibrary}>
                {!image && <Ionicons name={icons.ICON_UPLOAD} size={24} color={color.DARK_GREY}/>}
                {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.imageStyle} />}
            </TouchableOpacity >
            <Text style={{...layout.regularTextBase, alignSelf: 'center'}}>Please upload avatar</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    rootView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginEnd: 20,
        width: 100,
        backgroundColor: color.GREY,
        height: 100,
        borderRadius: 100,
        ...layout.shadowBase,
    },
    imageStyle: {
        width: 98, height: 98, resizeMode: 'cover', borderRadius: 100
    }
});
