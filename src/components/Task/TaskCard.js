import React, {useEffect, useState, useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Animated, Easing} from 'react-native';
import {getHoursAndMinutes, getTaskImageByType} from '../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../constants/colors';
import layout from '../../constants/layout';
import icon from '../../constants/icons';
import moment from 'moment';
import {TasksQuickActions} from "./TasksQuickActions";

export const TaskCard = ({data, index, onTaskPress, onTaskLongPress}) => {

    const isFutureDay = moment().add(2, 'd') < data.taskEndDate;
    const isPrevDay = moment().subtract(1, 'd') > data.taskEndDate;
    const hasSubTasks = data.subTasks;
    const hasImages = data.images;
    const isFinished = data.isFinished;
    const isExpired = moment() > data.taskEndDate;
    const [isQuickActionsShown, setIsQuickActionsShown] = useState(false);
    const expandAnim = new Animated.Value(isQuickActionsShown ? 0 : 1);

    useEffect(() => {
        Animated.spring(
            expandAnim,
            {
                toValue: !isQuickActionsShown ? 0 : 1,
                friction: 4,
                tension: 140,
                useNativeDriver: true
            }
        ).start();
    }, [isQuickActionsShown]);

    const expand = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    const renderSubTasks = () => {
        if (hasSubTasks) {
            return (
                <FlatList
                    scrollEnabled={false}
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

    const renderImages = () => {
        if (hasImages) {
            return (
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    data={data.images}
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

    const renderQuickActions = () => {
        return (
            <Animated.View style={{transform: [{scaleY: expand}]}}>
                <TasksQuickActions task={data}/>
            </Animated.View>
        )
    };

    return (
        <View key={index} style={styles.mainContainer}>

            <View style={{alignItems: 'center', width: 40}}>
                <Ionicons name={icon.ICON_TASK_STATUS} size={22} color={isFinished ? color.ORANGE : color.DARK_GREY}/>
            </View>

            <TouchableOpacity
                activeOpacity={layout.activeOpacity}
                style={[styles.taskContainer, {backgroundColor: isFinished ? color.ORANGE : color.GREY}, renderBorderRadiusPosition()]}
                onPress={() => onTaskPress(data)}
                onLongPress={() => setIsQuickActionsShown(!isQuickActionsShown)}>

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
                        {renderImages()}
                    </View>
                </View>

                {isQuickActionsShown && renderQuickActions()}

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
