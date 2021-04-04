import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {fetchAllUsers} from '../../store/actions/UserAction';
import {SearchedUserItem} from '../../components/search/SearchedUserItem';
import {SearchedUserProfileScreen} from '../../components/Modals/SearchedUserProfileScreen';
import {showFriendProfileModal, showSearchedUserProfileModal} from '../../store/actions/GeneralActions';
import {CustomTextInput} from '../../components/common/CustomTextInput';
import {FriendProfileScreen} from '../../components/Modals/FriendProfileScreen';
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import icons from '../../constants/icons';

export const SearchScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.UserReducer.allUsers);
    const currentUser = useSelector(state => state.UserReducer.currentUser);
    const friends = currentUser.friends && Object.keys(currentUser.friends).map(key => ({
        ...currentUser.friends[key],
        id: key,
    }));
    const toShowSearchedUserProfileModal = useSelector(state => state.GeneralReducer.showSearchedUserProfileModal);
    const toShowFriendProfileModal = useSelector(state => state.GeneralReducer.showFriendProfileModal);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const searchedUser = allUsers.filter(user => user.userDetails.name.includes(searchText) && user.userDetails.id !== currentUser.userDetails.id);

    const onSearchedUserPressed = (searchedUser) => {
        if (friends) {
            let isFriend = false;
            for (let i = 0; i < friends.length; i++) {
                if (friends[i].friendDetails.id === searchedUser.id) {
                    isFriend = true;
                    break;
                }
            }
            if (isFriend) {
                dispatch(showFriendProfileModal(true, searchedUser));
            } else {
                dispatch(showSearchedUserProfileModal(true, searchedUser));
            }
        } else {
            dispatch(showSearchedUserProfileModal(true, searchedUser));
        }
    };

    return (
        <View style={styles.mainContainer}>

            {!allUsers.length &&
            <ActivityIndicator style={styles.loadingIndicator} size={'large'} color={color.GREEN}/>}

            <SearchedUserProfileScreen toShowSearchedUserProfileModal={toShowSearchedUserProfileModal}/>

            <FriendProfileScreen toShowFriendProfileModal={toShowFriendProfileModal}/>

            <CustomTextInput icon={icons.ICON_SEARCH} placeholder={'Search peoples'} value={searchText}
                             onChangeText={setSearchText}/>
            <View>

                <Text style={styles.usersTitle}>{`${searchedUser.length} peoples was found!`}</Text>

                <FlatList
                    style={styles.usersListContainer}
                    data={searchedUser}
                    keyExtractor={(item, index) => item + 'd' + index.toString()}
                    renderItem={({item, index}) => {
                        return (
                            <SearchedUserItem searchedUser={item.userDetails} indexToAnimate={index}
                                              onUserPressed={(searchedUser) => onSearchedUserPressed(searchedUser)}/>
                        );
                    }}
                />

            </View>

        </View>
    );
};

SearchScreen.navigationOptions = () => ({
    headerTitle: () => {
        return (
            <View>
                <Text style={styles.headerTitle}>Search</Text>
            </View>
        );
    },
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: layout.defaultPaddingSize,
        backgroundColor: color.WHITE,
    },
    headerTitle: {
        ...layout.boldTextBase,
    },
    usersTitle: {
        marginTop: 20,
        marginBottom: 10,
        ...layout.regularTextBase,
    },
    usersListContainer: {
        height: '100%',
        marginHorizontal: -layout.defaultPaddingSize,
    },
    loadingIndicator: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
    },
});
