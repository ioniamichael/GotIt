import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {getHoursAndMinutes, getTaskImageByType} from '../../utils';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import moment from 'moment';

export const TaskDetailsScreen = ({navigation}) => {

    const task = navigation.getParam('task');

    const renderSubTasks = () => {
        if (task.subTasks) {
            return (
                task.subTasks.map((subTask, index) => {
                    return (
                        <Text key={index.toString()}
                              style={{...layout.regularTextBase, color: color.DARK_GREY}}>{index + 1}- {subTask}</Text>
                    );
                })
            );
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View>
                    <Text style={{...layout.boldTextBase,fontSize: 12, textAlign: 'center'}}>{moment(task.taskEndDate).format('MMMM-DD-YYYY')}</Text>
                    <Text style={{...layout.boldTextBase, textAlign: 'center'}}>{moment(task.taskEndDate).format('HH:MM')}</Text>
                </View>
                <TouchableOpacity style={styles.taskTypeContainer}>
                    <Image source={getTaskImageByType(task.taskType)} style={styles.taskTypeImage}/>
                </TouchableOpacity>
            </View>
            <Text style={{marginBottom: 30, ...layout.boldTextBase, textAlign: 'center'}}>{task.taskTitle}</Text>
            <View style={{marginBottom: 30}}>
                {renderSubTasks()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: color.WHITE,
        padding: layout.defaultPaddingSize,
    },
    taskTypeContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: color.GREY,
    },
    taskTypeImage: {
        width: 50,
        height: 50,
    },
});
