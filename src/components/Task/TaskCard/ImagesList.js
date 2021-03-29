import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
import color from "../../../constants/colors";

export const ImagesList = ({images, isFinished}) => {

    return (
        <View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                data={images}
                style={{marginTop: 10}}
                keyExtractor={(subTask, index) => 'D' + index.toString()}
                renderItem={({item, index}) => {
                    return (
                        <View
                            style={[styles.imageContainer, {
                                borderColor: isFinished ? color.ORANGE : color.GREY,
                                marginStart: index !== 0 ? -10 : 0,
                            }]}>
                            <Image source={{uri: `data:image/jpeg;base64,${item}`}} style={styles.imageStyle}/>
                        </View>
                    );
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    imageContainer: {
        borderRadius: 100,
        borderWidth: 2,
    },
    imageStyle: {
        width: 35,
        height: 35,
        borderRadius: 100,
    },
});
