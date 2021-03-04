import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../constants/colors';
import layout from '../constants/layout';
import icon from '../constants/icons';
import {getTaskImageByType} from '../utils';

export const TaskCard = ({data, index, onTaskPress}) => {

    const isFinished = data.isFinished;
    const hasSubTasks = data.subTasks;

    const renderSubTasks = () => {
        if (hasSubTasks) {
            return (
                <FlatList
                    data={data.subTasks}
                    style={styles.subTasksContainer}
                    keyExtractor={(subTask, index) => 'D' + index.toString()}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.subTasks}>
                                <Text style={[{...layout.regularTextBase}, {fontSize: 12}]}>*</Text>
                                <Text numberOfLines={2} style={[{...layout.regularTextBase}, {fontSize: 12, marginStart: 5}]}>{item}</Text>
                            </View>
                        );
                    }}
                />
            );
        }
    };

    const renderBorderRadiusPosition = () => {
        if (index % 2 == 0){
            return{
                borderRadius: 20,
                borderBottomEndRadius: 0
            }
        }else {
            return{
                borderRadius: 20,
                borderTopEndRadius: 0
            }
        }
    };

    return (
        <View style={styles.mainContainer}>

            <Ionicons name={icon.TASK_STATUS_ICON} size={20} color={isFinished ? color.YELLOW : 'grey'}/>
            <TouchableOpacity style={[styles.taskContainer, {backgroundColor: isFinished ? color.YELLOW : color.GREY}, renderBorderRadiusPosition()]} onPress={() => onTaskPress(data)}>
                <View style={styles.titleContainer}>
                    <Image source={getTaskImageByType(data.taskType)} style={{width: 30, height: 30, marginEnd: 10}} />
                    <Text numberOfLines={1} style={[{...layout.boldTextBase}, {fontSize: 14, width: '69%'}]}>{data.taskTitle}</Text>
                    <Text numberOfLines={1} style={[{...layout.boldTextBase}, {fontSize: 11}]}>7:00am</Text>
                </View>
                {renderSubTasks()}
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskContainer: {
        marginStart: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flex: 1,
        backgroundColor: color.YELLOW,
    },
    titleContainer:{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    subTasksContainer: {
        marginTop: 5,
        marginHorizontal: 10,
    },
    subTasks:{
        flexDirection: 'row'
    }
});
