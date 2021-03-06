import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text, Image} from 'react-native';
import layout from '../../constants/layout';
import assets from '../../constants/assets';
import color from '../../constants/colors';

export const TaskTypePicker = ({onTypeSelect, taskTypeTitle, taskType}) => {

    const renderSelectedTypeStyle = (type) => {
        if (type === taskType) {
            return {
                backgroundColor: color.YELLOW,
                borderRadius: 10,
            };
        } else {
            return {
                borderRadius: 10,
            };
        }
    };

    return (
        <View style={styles.typesContainerStyle}>
            <Text style={{...layout.boldTextBase, marginStart: 40, marginBottom: layout.height * 0.03}}>Pick your task
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

            <Text style={{...layout.regularTextBase, marginStart: 40, marginBottom: 20}}>{taskTypeTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    typesContainerStyle: {
        height: 200,
        marginBottom: layout.height * 0.03,
    },
    flatListContainer: {
    },
    pickerContainerStyle: {
        margin: 2,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerImageStyles: {
        width: 45,
        height: 45,
    },
});
