import React from 'react';
import {StyleSheet, Text, SectionList, View} from 'react-native';
import {TaskCard} from './TaskCard/TaskCard';
import moment from 'moment';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import appConfig from "../../constants/appConfig";


export const TaskList = ({data, onTaskPress, onTaskLongPress}) => {

    data.sort((a, b) => (a.taskEndDate > b.taskEndDate) ? 1 : ((b.taskEndDate > a.taskEndDate) ? -1 : 0));

    let sortedData = [];
    let length = 0;

    data.forEach(task => {
        if(sortedData[length - 1] && moment(task.taskEndDate).format(appConfig.DAYS_FORMAT) === sortedData[length - 1].title){
            sortedData[length - 1].data.push(task);
        }
        else{
            sortedData.push({title: moment(task.taskEndDate).format(appConfig.DAYS_FORMAT), data: [task] });
            ++length;
        }
    });

    const renderTitleIfHasData = (dataToRender, titleToRender) => {
        if (dataToRender.length) {
            return (
                <View style={{backgroundColor: color.WHITE}}>
                    <Text style={{...layout.boldTextBase, fontSize: 12, marginVertical: 10}}>{
                        titleToRender === moment().format(appConfig.DAYS_FORMAT)
                            ? 'Today'
                            : titleToRender}
                    </Text>
                </View>
            );
        }
    };
    return (
        <SectionList
            showsVerticalScrollIndicator={false}
            sections={sortedData}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => {
                return (
                    <TaskCard data={item} index={index} onTaskPress={onTaskPress} onTaskLongPress={onTaskLongPress}/>
                );
            }}
            renderSectionHeader={({section: {title}, section: {data}}) => {
                return (
                    renderTitleIfHasData(data, title)
                );
            }}
        />
    );

};

const styles = StyleSheet.create({
    container: {},
});
