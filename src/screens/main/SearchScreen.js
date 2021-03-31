import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {fetchAllUsers} from "../../store/actions/UserAction";
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import {CustomTextInput} from "../../components/common/CustomTextInput";
import icons from "../../constants/icons";
import {SearchedUserItem} from "../../components/search/SearchedUserItem";

export const SearchScreen = () => {

    const dispatch = useDispatch();
    const allUsers = useSelector(state => state.UserReducer.allUsers);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch]);

    const searchedUser = allUsers.filter(user => user.userDetails.name.includes(searchText));

    return (
        <View style={styles.mainContainer}>

            <CustomTextInput icon={icons.ICON_SEARCH} placeholder={'Search term here'} value={searchText} onChangeText={setSearchText}/>

            <View>

                <Text style={styles.usersTitle}>{`${searchedUser.length} peoples was found!`}</Text>

                <FlatList
                    style={{alignSelf: 'center'}}
                    scrollEnabled={false}
                    numColumns={4}
                    data={searchedUser}
                    keyExtractor={(item, index) => item + 'd' + index.toString()}
                    renderItem={({item,index}) => {
                        return(
                            <SearchedUserItem user={item} indexToAnimate={index}/>
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
    }
});
