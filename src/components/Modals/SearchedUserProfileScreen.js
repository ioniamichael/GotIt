import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {BlurView} from "@react-native-community/blur";
import {ImagePicker} from "../Auth/ImagePicker";
import {setShowLoader, showSearchedUserProfileModal} from '../../store/actions/GeneralActions';
import {SafeAreaView} from "react-native-safe-area-context";
import {addToFriends} from '../../services/userService';
import {fetchAllUsers, fetchUserDetails} from '../../store/actions/UserAction';
import layout from '../../constants/layout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from "../../constants/icons";
import color from "../../constants/colors";
import {useDispatch, useSelector} from 'react-redux';
import {MainLoader} from '../Loaders/MainLoader';

export const SearchedUserProfileScreen = ({toShowSearchedUserProfileModal}) => {

    const dispatch = useDispatch();
    const searchedUser = useSelector(state => state.GeneralReducer.searchedUser);
    const isLoaderShown = useSelector(state => state.GeneralReducer.toShowLoader);


    const closeModal = () => {
        dispatch(showSearchedUserProfileModal(false, {}));
    };

    const addUserToFriend = async () => {
        dispatch(setShowLoader(true));
        try {
            await addToFriends(searchedUser);
            await dispatch(fetchUserDetails());
            closeModal();
        }catch (e) {
            console.log(':::Not added', e)
        }
        dispatch(setShowLoader(false));
    };

    return (
        <Modal
            visible={toShowSearchedUserProfileModal}
            animationType="fade"
            transparent={true}>

            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

            <SafeAreaView style={styles.mainContainer}>

                <MainLoader isVisible={isLoaderShown}/>

                <TouchableOpacity onPress={() => closeModal()} >
                    <Ionicons name={icons.ICON_CLOSE} size={34} color={color.DARK_GREY}/>
                </TouchableOpacity>

                <View style={styles.headerContainer}>
                    <ImagePicker isDisabled={true}
                                 image={searchedUser.image}/>

                    <View style={styles.emailAndNameContainer}>
                        <Text style={styles.boldText}>{searchedUser.name}</Text>
                        <Text style={styles.regularText}>{searchedUser.email}</Text>
                    </View>

                </View>

                <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.addToFriedButton} onPress={addUserToFriend}>
                    <Text style={styles.regularText}>Add to friends</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding:layout.defaultPaddingSize,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
    },
    headerContainer: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
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
        alignItems:'center',
        marginVertical: 20
    },
    addToFriedButton:{
        borderRadius:30,
        alignSelf:'center',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
        width: 150,
        ...layout.shadowBase,
        backgroundColor:color.GREEN
    },
    regularText:{...layout.regularTextBase},
    boldText:{...layout.boldTextBase}
});
