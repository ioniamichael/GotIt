import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Animated, Easing} from 'react-native';
import {getHoursAndMinutes, getTaskImageByType} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icon from '../../constants/icons';
import moment from 'moment';

export const TaskCard = ({data, index, onTaskPress, onTaskLongPress}) => {

    const isFinished = data.isFinished;
    const isExpired = moment() > data.taskEndDate;
    const isFutureDay = moment().add(2, 'd') < data.taskEndDate;
    const isPrevDay = moment().subtract(1, 'd') > data.taskEndDate;
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
                                <Text numberOfLines={2} style={[{...layout.regularTextBase}, {
                                    fontSize: 12,
                                }]}>{item}</Text>
                            </View>
                        );
                    }}
                />
            );
        }
    };

    const renderBorderRadiusPosition = () => {
        if (index % 2 === 0) {
            return {
                borderRadius: 20,
                borderBottomEndRadius: 0,
            };
        } else {
            return {
                borderRadius: 20,
                borderTopEndRadius: 0,
            };
        }
    };

    return (
        <View style={styles.mainContainer}>

            <View style={{alignItems: 'center', width: 40}}>
                <Ionicons name={icon.ICON_TASK_STATUS} size={22} color={isFinished ? color.ORANGE : color.DARK_GREY}/>
            </View>

            <TouchableOpacity
                style={[styles.taskContainer, {backgroundColor: isFinished ? color.ORANGE : color.GREY}, renderBorderRadiusPosition()]}
                onPress={() => onTaskPress(data)}
                onLongPress={() => onTaskLongPress(data)}
            >

                {isFutureDay || isPrevDay ?
                    <Text style={styles.dateStyle}>{moment(data.taskEndDate).format('MMMM-D').toString()}</Text> : null}
                <View style={styles.titleContainer}>
                    <View style={styles.taskImageTypeContainer}>
                        <Image source={getTaskImageByType(data.taskType)} style={styles.typeImageStyle}/>
                    </View>
                    <View style={styles.innerTaskContainer}>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1}
                                  style={[{...layout.boldTextBase}, {
                                      fontSize: 12,
                                      width: '69%',
                                  }]}>{data.taskTitle}</Text>
                            <Text numberOfLines={1}
                                  style={[{...layout.boldTextBase}, {fontSize: 11}]}>{getHoursAndMinutes(data.taskEndDate)}</Text>
                        </View>
                        {renderSubTasks()}
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    typeImageContainer: {
        backgroundColor: color.GREY,
        borderRadius: 10,
    },
    typeImageStyle: {
        width: 20,
        height: 20,
        alignSelf: 'flex-start',
    },
    innerTaskContainer: {
        marginStart: 5,
    },
    taskContainer: {
        marginStart: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flex: 1,
        backgroundColor: color.ORANGE,
    },
    titleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    subTasksContainer: {},
    taskImageTypeContainer: {
        alignSelf: 'flex-start',
        backgroundColor: color.GREY,
        padding: 10,
        borderRadius: 10,
    },
    subTasks: {
        flexDirection: 'row',
    },
    dateStyle: {
        ...layout.regularTextBase,
        fontSize: 10,
        position: 'absolute',
        top: 10,
        right: 5,
    },
});
