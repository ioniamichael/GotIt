import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text, FlatList} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../../constants/icons';

export const TaskImagePicker = ({images, onImagePicked}) => {

    const selectPhotoFromLibrary = () => {
        launchImageLibrary({mediaType: 'photo', includeBase64: true, quality: 0.2}, (res) => {
            onImagePicked(res.base64);
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
                   return(
                       <TouchableOpacity style={{...layout.shadowBase, marginVertical: 15, marginEnd: 10,  borderRadius: 20}}>
                           <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
                       </TouchableOpacity>
                   )
               }}
           />

       </View>
    );
};

const styles = StyleSheet.create({
    rootView: {
        width: '100%',
        marginBottom:15,
        borderRadius: 100,
    },
    uploadIconContainer:{
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageStyle: {
        width: layout.width * 0.6,
        height: layout.height * 0.18,
        borderWidth: 1,
        borderRadius: 20,
    },
});
