import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {TaskCard} from './TaskCard';

export const TaskList = ({data, onTaskPress}) => {
    return(
        <FlatList
            data={data}
            keyExtractor={(task, index) => 'D' + index.toString()}
            renderItem={({item, index}) => {
                return(
                    <View style={styles.container}>
                        <TaskCard data={item} index={index} onTaskPress={onTaskPress}/>
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
