import React from 'react';
import {StyleSheet, Text, SectionList,View} from 'react-native';
import {TaskCard} from './TaskCard/TaskCard';
import moment from 'moment';
import layout from '../../constants/layout';
import color from '../../constants/colors';


export const TaskList = ({data, onTaskPress, onTaskLongPress}) => {

    data.sort((a, b) => (a.taskEndDate > b.taskEndDate) ? 1 : ((b.taskEndDate > a.taskEndDate) ? -1 : 0));

    const sortedData = [
        {
            title: 'Previous',
            data: data.filter((task) => moment().format('YYYY-MM-DD') > moment(task.taskEndDate).format('YYYY-MM-DD')),
        },
        {
            title: `Today - ${moment().format('MMMM-DD')}`,
            data: data.filter((task) => moment().format('YYYY-MM-DD') === moment(task.taskEndDate).format('YYYY-MM-DD')),
        },
        {
            title: 'Tomorrow',
            data: data.filter((task) => moment().add(1, 'd').format('YYYY-MM-DD') === moment(task.taskEndDate).format('YYYY-MM-DD')),
        },
        {
            title: moment().add(2, 'd').format('YYYY-MM-DD'),
            data: data.filter((task) => moment().add(2, 'd').format('YYYY-MM-DD') === moment(task.taskEndDate).format('YYYY-MM-DD')),
        },
        {
            title: 'Future',
            data: data.filter((task) => moment().add(2, 'd').format('YYYY-MM-DD') < moment(task.taskEndDate).format('YYYY-MM-DD')),
        },
    ];

    const renderTitleIfHasData = (dataToRender, titleToRender) => {
        if (dataToRender.length) {
            return (
                <View style={{backgroundColor: color.WHITE}}>
                    <Text style={{...layout.boldTextBase, fontSize: 12, marginVertical: 10}}>{titleToRender}</Text>
                </View>
            );
        }
    };
    return (
        <SectionList
            sections={sortedData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
                return (
                    <TaskCard data={item} index={index} onTaskPress={onTaskPress} onTaskLongPress={onTaskLongPress} />
                );
            }}
            renderSectionHeader={({section: {title}, section: {data}}) => {
                return (
                    renderTitleIfHasData(data, title)
                );
            }}
        />
    );

};

const styles = StyleSheet.create({
    container: {},
});
