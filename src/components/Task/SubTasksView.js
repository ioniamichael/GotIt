import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Platform} from 'react-native';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import strings from '../../constants/strings';
import icons from '../../constants/icons';

export const SubTasksView = ({subTasks, onAddSubTask, subTaskValue, setSubTaskValue, onPressDeleteSubTask}) => {


    return (
        <View style={styles.mainContainer}>
            <View style={styles.textInputContainerStyle}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder={strings.PLACEHOLDER_SUB_TASK}
                    value={subTaskValue}
                    onChangeText={setSubTaskValue}
                />

                <TouchableOpacity style={styles.addButtonStyle} onPress={onAddSubTask}>
                    <Ionicons name={icons.ICON_ADD} size={35} color={color.ORANGE}/>
                </TouchableOpacity>
            </View>

                {subTasks.map((subTask, index) => {
                    return (
                        <View key={subTask + 'd' + index}  style={styles.subTasksContainer}>
                            <Text style={styles.subTaskText}>{subTask}</Text>
                            <TouchableOpacity onPress={() => onPressDeleteSubTask(index)}>
                                <Ionicons name={icons.ICON_TRASH} size={20} color={color.DARK_GREY}/>
                            </TouchableOpacity>
                        </View>
                    );
                })}

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        width: layout.width - (layout.defaultPaddingSize *2),
        marginBottom: 20,
    },
    textInputContainerStyle: {
        marginBottom:20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: color.ORANGE,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: color.TRANSPARENT_WHITE,
    },
    textInputStyle: {
        ...layout.regularTextBase,
        width: '85%',
        height: 50
    },
    addButtonStyle: {

    },
    subTasksContainer: {
        marginHorizontal:10,
        marginBottom:10,
        paddingHorizontal:20,
        flexDirection: 'row',
        backgroundColor: color.GREY,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 40,
    },
    subTaskText: {
        ...layout.regularTextBase,
        width: '85%',
    },
});
