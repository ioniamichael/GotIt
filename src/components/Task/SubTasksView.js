import React, {useEffect} from 'react';
import {StyleSheet, View, Text,TouchableOpacity, TextInput, FlatList, LogBox} from 'react-native';
import {SubTaskItem} from "../SubTaskItem";
import layout from '../../constants/layout';
import color from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import strings from '../../constants/strings';
import icons from '../../constants/icons';


export const SubTasksView = ({renderedIndex, subTasks, onAddSubTask, subTaskValue, setSubTaskValue, onPressDeleteSubTask}) => {

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const onPressDeleteSubTaskHandler = index => {
        onPressDeleteSubTask(index);
    };


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

            <FlatList
                data={subTasks}
                keyExtractor={(item, index) => 'D' + index.toString()}

                renderItem={({item, index}) => {
                    return(
                        <SubTaskItem subTask={item} renderedIndex={index} onPressDeleteButton={() => onPressDeleteSubTaskHandler(index)} />
                    )
                }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: layout.width - (layout.defaultPaddingSize * 2),
        marginBottom: 20,
    },
    textInputContainerStyle: {
        marginBottom: 20,
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
        height: 50,
    },
});
