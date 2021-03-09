import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import color from '../../constants/colors';
import {getHoursAndMinutes} from '../../utils';

export const TaskDetailsScreen = ({navigation}) => {

    const task = navigation.getParam('task');

    return(
        <View style={styles.mainContainer}>
            <Text>{getHoursAndMinutes(task.taskEndDate)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: color.WHITE
    }
});
