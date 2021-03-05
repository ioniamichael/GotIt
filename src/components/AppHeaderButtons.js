import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import layout from '../constants/layout';

export const AppHeaderButtons = (props) => {
    return (
        <HeaderButton
            {...props}
            iconSize={22}
            IconComponent={Ionicons}
        />
    );
};
