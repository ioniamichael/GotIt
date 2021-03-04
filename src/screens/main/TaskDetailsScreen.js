import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import color from '../../constants/colors';

export const TaskDetailsScreen = ({}) => {
    return(
        <View style={styles.mainContainer}>
            <Text>Task details</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: color.WHITE
    }
});
