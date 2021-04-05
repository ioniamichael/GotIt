import React from 'react';
import {StyleSheet,View, Text} from 'react-native';
import moment from 'moment';
import layout from '../../constants/layout';
import appConfig from '../../constants/appConfig';

export const TaskDetailsDateSection = ({taskEndDate}) => {
  return(
      <View>
          <Text style={styles.textStyle}>{moment(taskEndDate).format(appConfig.DAYS_FORMAT)}</Text>
          <Text style={styles.textStyle}>{moment(taskEndDate).format('dddd')}</Text>
          <Text style={styles.textStyle}>{moment(taskEndDate).format('HH:MM')}</Text>
      </View>
  )
};

const styles = StyleSheet.create({
    textStyle:{
        ...layout.boldTextBase,
        fontSize: 12,
        textAlign: 'center',
    }
});
