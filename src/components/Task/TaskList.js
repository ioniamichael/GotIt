import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, Text, SectionList} from 'react-native';
import {TaskCard} from './TaskCard';
import moment from 'moment';
import layout from '../../constants/layout';


export const TaskList = ({data, onTaskPress, onTaskLongPress}) => {

    const sortedData = [
        {
            title: 'Previous',
            data: data.filter((task) => moment().format('YYYY-MM-DD') > moment(task.taskEndDate).format('YYYY-MM-DD'))
        },
        {
            title: 'Today',
            data: data.filter((task) => moment().format('YYYY-MM-DD') === moment(task.taskEndDate).format('YYYY-MM-DD'))
        },
        {
            title: 'Tomorrow',
            data: data.filter((task) => moment().add(1, 'd').format('YYYY-MM-DD') === moment(task.taskEndDate).format('YYYY-MM-DD'))
        },
        {
            title: moment().add(2, 'd').format('YYYY-MM-DD'),
            data: data.filter((task) => moment().add(2, 'd').format('YYYY-MM-DD') === moment(task.taskEndDate).format('YYYY-MM-DD'))
        },
        {
            title: 'Future',
            data: data.filter((task) => moment().add(2, 'd').format('YYYY-MM-DD') < moment(task.taskEndDate).format('YYYY-MM-DD'))
        }
    ];

    console.log(moment().add(1, 'd').format('YYYY-MM-DD'));

    const renderTitleIfHasData = (dataToRender, titleToRender) => {
        if (dataToRender.length){
            return(
                <Text style={{...layout.boldTextBase, marginVertical: 10}}>{titleToRender}</Text>
            )
        }
    };

    return (
        <SectionList
            sections={sortedData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
                return(
                    <TaskCard data={item} index={index} onTaskPress={onTaskPress} onTaskLongPress={onTaskLongPress} />
                )
            }}
            renderSectionHeader={({section: {title}, section:{data}})=>{
                return(
                    renderTitleIfHasData(data, title)
                )
            }}
        />
    );

};

const styles = StyleSheet.create({
    container: {},
});

