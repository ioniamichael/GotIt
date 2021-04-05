import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity, Image} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useDispatch, useSelector} from 'react-redux';
import layout from '../../constants/layout';
import color from '../../constants/colors';
import assets from '../../constants/assets';
import {setShowPopUp} from '../../store/actions/GeneralActions';

export const ErrorsPopUp = () => {

    const dispatch = useDispatch();
    const toShowPopUp = useSelector(state => state.GeneralReducer.toShowPopUp);
    const errorMessage = useSelector(state => state.GeneralReducer.errorMessage);

    setTimeout(() => {
        dispatch(setShowPopUp(false,''));
    }, 5000);

    return (
        <Modal
            visible={toShowPopUp}
            animationType="fade"
            transparent={true}>

            <BlurView
                style={styles.absolute}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

            <View style={styles.rootView}>


                <View style={styles.errorFrame}>

                    <TouchableOpacity activeOpacity={layout.activeOpacity} style={styles.errorImageContainer}>
                        <Image source={assets.IMAGE_UPLOAD} style={styles.uploadImageStyle}/>
                    </TouchableOpacity>

                    <Text style={styles.errorMessageText}>{errorMessage}</Text>
                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    rootView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: layout.height,
        width: layout.width,
    },
    errorFrame: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        height: layout.width * 0.8,
        width: layout.width * 0.8,
        ...layout.shadowOfPinnedItem,
        backgroundColor: color.GREEN,
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
    },
    errorImageContainer: {
        backgroundColor: color.GREEN,
        position: 'absolute',
        top: -40,
        width: 80,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadImageStyle:{width: 50, height: 50},
    errorMessageText:{...layout.regularTextBase, fontSize: 14}


});
