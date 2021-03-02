import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {TaskList} from '../../components/TaskList';
import {useSelector} from 'react-redux';
import color from '../../constants/colors';

export const HomeScreen = ({}) => {

    const userDetails = useSelector(state => state.UserReducer.userDetails);
    const tasks = useSelector(state => state.GeneralReducer.taskList);



    return (
        <View style={styles.container}>
            <TaskList data={tasks} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.WHITE,
    }
});
