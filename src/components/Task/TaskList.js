import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {TaskCard} from './TaskCard';
import layout from '../../constants/layout';

export const TaskList = ({data, onTaskPress, onTaskLongPress}) => {

    return(
            <FlatList
                data={data.sort((a, b) => a.taskCreationDate.localeCompare(b.taskCreationDate))}
                showsVerticalScrollIndicator={false}
                keyExtractor={(task, index) => 'D' + index.toString()}
                renderItem={({item, index}) => {
                    return(
                        <View style={styles.container}>
                            <TaskCard data={item} index={index} onTaskPress={onTaskPress} onTaskLongPress={onTaskLongPress}/>
                        </View>
                    )
                }}
            />
    )
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
    }
});
