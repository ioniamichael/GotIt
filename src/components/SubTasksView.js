import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Platform} from 'react-native';
import layout from '../constants/layout';
import color from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const SubTasksView = ({subTasks, onAddSubTask, subTaskValue, setSubTaskValue, onPressDeleteSubTask}) => {


    return (
        <View>
            <View style={styles.textInputContainerStyle}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={'Add new sub task'}
                    value={subTaskValue}
                    onChangeText={setSubTaskValue}
                />

                <TouchableOpacity style={styles.addButtonStyle} onPress={onAddSubTask}>
                    <Ionicons name={'add-circle-outline'} size={35} color={color.YELLOW}/>
                </TouchableOpacity>
            </View>


            {subTasks.map((subTask, index) => {
                return (
                    <View key={subTask}  style={styles.subTasksContainer}>
                        <Text style={styles.subTaskText}>{subTask}</Text>
                        <TouchableOpacity onPress={() => onPressDeleteSubTask(index)}>
                            <Ionicons name={'trash-outline'} size={30} color={color.BLACK}/>
                        </TouchableOpacity>
                    </View>
                );
            })}

        </View>
    );
};

const styles = StyleSheet.create({
    textInputContainerStyle: {
        flexDirection: 'row',
        width: layout.width * 0.75,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: color.YELLOW,
        borderRadius: 100,
        paddingHorizontal: 20,
        marginVertical: 7.5,
        borderWidth: 1,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        backgroundColor: color.TRANSPARENT_WHITE,
    },
    textInputStyle: {
        width: '85%',
    },
    addButtonStyle: {},
    subTasksContainer: {
        flexDirection: 'row',
        width: layout.width * 0.75,
        backgroundColor: color.GREY,
        marginVertical: 5,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 40,
    },
    subTaskText: {
        width: '85%',
    },
});
