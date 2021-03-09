import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import {TaskCard} from './TaskCard';

export const TaskList = ({data, onTaskPress, onTaskLongPress}) => {


    return (
        <FlatList
            data={data.sort((a, b) => a.taskEndDate.toString().localeCompare(b.taskEndDate.toString()))}
            showsVerticalScrollIndicator={false}
            keyExtractor={(task, index) => 'D' + index.toString()}
            renderItem={({item, index}) => {
                return (
                    <View style={styles.container}>
                        <TaskCard data={item} index={index} onTaskPress={onTaskPress}
                                  onTaskLongPress={onTaskLongPress}/>
                    </View>
                );
            }}/>
    );
};

const styles = StyleSheet.create({
    container: {},
});
