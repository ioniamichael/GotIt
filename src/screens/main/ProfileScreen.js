import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderButtons} from '../../components/AppHeaderButtons';
import icons from '../../constants/icons';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {useSelector} from 'react-redux';
import {friendsData} from '../../mockData';

export const ProfileScreen = ({navigation}) => {

    const userDetails = useSelector(state => state.UserReducer.userDetails);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image style={styles.photoStyle} source={{uri: userDetails.photoURL}}/>
                </TouchableOpacity>
                <View style={styles.emailAndNameContainer}>
                    <Text style={{...layout.boldTextBase}}>{userDetails.name}</Text>
                    <Text style={{...layout.regularTextBase}}>{userDetails.email}</Text>
                </View>
            </View>
            <View style={styles.friendContainer}>
                <Text style={{...layout.boldTextBase}}>Your friend:</Text>
                <FlatList
                    style={{paddingHorizontal: 30}}
                    data={friendsData}
                    keyExtractor={(friend, index) => 'D' + index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({friend, index}) => {
                        return (
                            <TouchableOpacity style={styles.friendsCard}>
                                <Image source={{uri: friendsData[index].photoURL}} style={{width: 100, height: 100, borderRadius: 30}}/>
                                <Text style={{width: 100}}>{friendsData[index].name}</Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};


ProfileScreen.navigationOptions = ({navigation}) => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>
        );
    },
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButtons}>
            <Item
                onPress={
                    () => navigation.navigate('NotificationsScreen')
                }
                title={'NOTIFICATION'}
                iconName={icons.NOTIFICATION_ICON}/>
        </HeaderButtons>
    ),
});

const styles = StyleSheet.create({
    mainContainer: {
        padding: 30,
        flex: 1,
        backgroundColor: color.WHITE,
    },
    headerContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    photoStyle: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    headerTitle: {
        ...layout.boldTextBase,
    },
    emailAndNameContainer: {
        marginStart: 20,
        justifyContent: 'center',
    },
    friendContainer: {
        marginTop: 30,
        marginHorizontal: -30,
    },
    friendsCard:{
        margin:5,
    }
});
