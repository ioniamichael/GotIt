import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import layout from "../../constants/layout";

export const SubTaskList = ({subTasks}) => {
    return (
        <View>
            <FlatList
                scrollEnabled={false}
                data={subTasks}
                style={styles.subTasksContainer}
                keyExtractor={(subTask, index) => 'D' + index.toString()}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.subTasks}>
                            <Text style={[{...layout.regularTextBase}, {fontSize: 12}]}>{index + 1} - </Text>
                            <Text numberOfLines={2} style={[{...layout.regularTextBase}, {fontSize: 12}]}>{item}</Text>
                        </View>
                    );
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    subTasksContainer:{
        marginHorizontal: 10,
    },
    subTasks: {
        flexDirection: 'row',
    },
});
