import React, {useRef, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, Animated, Easing} from 'react-native';
import {getHoursAndMinutes, getTaskImageByType} from '../../utils';
import {SubTaskList} from "./SubTasksList";
import {ImagesList} from "./ImagesList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icon from '../../constants/icons';
import {ScaleAnimatedView} from "../common/ScaleAnimatedView";

export const TaskCard = ({data, index, onTaskPress, onTaskLongPress}) => {


    const hasSubTasks = data.subTasks;
    const hasImages = data.images;
    const isFinished = data.isFinished;

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
        <ScaleAnimatedView indexToAnimate={index}>

            <View style={styles.mainContainer}>
                <View style={styles.taskStatusIconContainer}>
                    <Ionicons name={icon.ICON_TASK_STATUS} size={22} color={isFinished ? color.GREEN : color.DARK_GREY}/>
                </View>

                <TouchableOpacity
                    index={index}
                    activeOpacity={layout.activeOpacity}
                    style={[
                        styles.taskContainer,
                        {
                            backgroundColor: isFinished ? color.GREEN : color.GREY,
                        },
                        renderBorderRadiusPosition(),
                    ]}
                    onPress={() => onTaskPress(data)}
                    onLongPress={() => onTaskLongPress(data)}>

                    <View style={styles.titleContainer}>

                        <View style={styles.taskImageTypeContainer}>
                            <Image source={getTaskImageByType(data.taskType)} style={styles.typeImageStyle}/>
                        </View>

                        <View style={styles.innerTaskContainer}>

                            <View style={styles.titleContainer}>

                                <Text numberOfLines={1} style={styles.title}>{data.taskTitle}</Text>

                                <Text numberOfLines={1} style={styles.endDate}>{getHoursAndMinutes(data.taskEndDate)}</Text>

                            </View>


                        </View>

                    </View>

                    <View style={styles.subTasksAndImagesContainer}>
                        {hasSubTasks && <SubTaskList subTasks={data.subTasks}/>}
                        {hasImages && <ImagesList images={data.images} isFinished={isFinished}/>}
                    </View>

                </TouchableOpacity>
            </View>

        </ScaleAnimatedView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 10,
        marginHorizontal: 2,
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
        paddingVertical: 20,
        flex: 1,
        backgroundColor: color.GREEN,
    },
    titleContainer: {
        marginHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        ...layout.boldTextBase,
        fontSize: 12,
        width: '69%',
    },
    endDate: {...layout.boldTextBase, fontSize: 11},
    taskImageTypeContainer: {
        alignSelf: 'flex-start',
        backgroundColor: color.GREY,
        padding: 10,
        borderRadius: 10,
    },
    subTasksAndImagesContainer: {
        paddingStart: 60,
        paddingEnd: 10,
    },
    taskStatusIconContainer: {alignItems: 'center', width: 40}
});
