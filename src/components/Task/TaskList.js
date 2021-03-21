import React from 'react';
import {StyleSheet, Text, SectionList, View} from 'react-native';
import {TaskCard} from './TaskCard/TaskCard';
import moment from 'moment';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import appConfig from "../../constants/appConfig";


export const TaskList = ({data, onTaskPress, onTaskLongPress}) => {

    data.sort((a, b) => (a.taskEndDate > b.taskEndDate) ? 1 : ((b.taskEndDate > a.taskEndDate) ? -1 : 0));

    const getSortedArrayWithTitles = () => {

        if (data.length) {
            let sortedArray = [
                {
                    title: moment(data[0].taskEndDate).format(appConfig.DAYS_FORMAT),
                    data: data.filter((task) => moment(task.taskEndDate).format(appConfig.DAYS_FORMAT) === moment(data[0].taskEndDate).format(appConfig.DAYS_FORMAT))
                }
            ];

            for (let i = 0, j = 0; i < data.length; i++) {
                if (!sortedArray[j].title.includes(moment(data[i].taskEndDate).format(appConfig.DAYS_FORMAT))) {
                    sortedArray.push(
                        {
                            title: moment(data[i].taskEndDate).format(appConfig.DAYS_FORMAT),
                            data: data.filter((task) => moment(task.taskEndDate).format(appConfig.DAYS_FORMAT) === moment(data[i].taskEndDate).format(appConfig.DAYS_FORMAT))
                        }
                    );
                    j++;
                }
            }
            return sortedArray;
        }
    };

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
            sections={getSortedArrayWithTitles()}
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
