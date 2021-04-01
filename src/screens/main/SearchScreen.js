import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Platform} from 'react-native';
import {fetchAllUsers} from "../../store/actions/UserAction";
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {CustomTextInput} from "../../components/common/CustomTextInput";
import icons from "../../constants/icons";
import {SearchedUserItem} from "../../components/search/SearchedUserItem";
import {SearchedUserProfileScreen} from "./SearchedUserProfileScreen";
import {showSearchedUserProfileModal} from "../../store/actions/GeneralActions";

export const SearchScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.UserReducer.allUsers);
    const currentUser = useSelector(state => state.UserReducer.currentUser);
    const toShowSearchUserProfileModal = useSelector(state => state.GeneralReducer.showSearchedUserProfileModal);
    const [searchText, setSearchText] = useState('');
    const [searchedUserForModal, setSearchedUserForModal] = useState(null);

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch]);

    const searchedUser = allUsers.filter(user => user.userDetails.name.includes(searchText) && user.userDetails.id !== currentUser.userDetails.id)
        .sort((a, b) => (a.userDetails.name > b.userDetails.name) ? 1 : ((b.userDetails.name > a.userDetails.name) ? -1 : 0));

    const onSearchedUserPress=(user) => {
        setSearchedUserForModal(user);
        dispatch(showSearchedUserProfileModal(true));
    };

    return (
        <View style={styles.mainContainer}>

            {!allUsers.length && <ActivityIndicator style={styles.loadingIndicator} size={'large'} color={color.GREEN}/>}

            {searchedUserForModal && <SearchedUserProfileScreen visible={toShowSearchUserProfileModal} searchedUser={searchedUserForModal} />}

            <CustomTextInput icon={icons.ICON_SEARCH} placeholder={'Search term here'} value={searchText} onChangeText={setSearchText}/>

            <View>

                <Text style={styles.usersTitle}>{`${searchedUser.length} peoples was found!`}</Text>

                <FlatList
                    style={styles.usersListContainer}
                    scrollEnabled={false}
                    data={searchedUser}
                    keyExtractor={(item, index) => item + 'd' + index.toString()}
                    renderItem={({item,index}) => {
                        return(
                            <SearchedUserItem user={item} indexToAnimate={index} onUserPressed={(user) => onSearchedUserPress(user)}/>
                        )
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
    }
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
    usersTitle:{
        marginTop: 20,
        marginBottom: 10,
        ...layout.regularTextBase
    },
    usersListContainer:{
        marginHorizontal: - layout.defaultPaddingSize
    },
    loadingIndicator:{
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position:'absolute'
    }
});
