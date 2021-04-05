import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import layout from '../../constants/layout';
import assets from '../../constants/assets';
import color from '../../constants/colors';

export const TaskTypePicker = ({onTypeSelect, taskTypeTitle, taskType}) => {

    const renderSelectedTypeStyle = (type) => {
        if (type === taskType) {
            return {
                backgroundColor: color.GREEN,
                borderRadius: 10,
                ...layout.shadowBase
            };
        } else {
            return {
                borderRadius: 10,
            };
        }
    };

    return (
        <View style={styles.typesContainerStyle}>
            <Text style={styles.titleStyle}>Pick your task
                type.</Text>

                <FlatList
                    style={styles.flatListContainer}
                    data={assets.PICKER}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={(type, index) => 'D' + index.toString()}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity
                                onPress={() => onTypeSelect(item)}
                                style={[styles.pickerContainerStyle, renderSelectedTypeStyle(item.TYPE)]}>
                                <Image source={item.IMAGE} style={styles.pickerImageStyles}/>
                            </TouchableOpacity>
                        );
                    }}
                />

            <Text style={styles.subTitleTextStyle}>Selected type is: {taskTypeTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    typesContainerStyle: {
        backgroundColor: color.WHITE,
        paddingVertical:20,
    },
    flatListContainer: {
        marginBottom: 15,
        paddingStart: 20,
    },
    pickerContainerStyle: {
        width: 70,
        height: 70,
        marginBottom:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerImageStyles: {
        width: 45,
        height: 45,
    },
    titleStyle:{...layout.boldTextBase, marginBottom: 15, marginHorizontal: 20},
    subTitleTextStyle: {...layout.regularTextBase,marginHorizontal: 20}
});
