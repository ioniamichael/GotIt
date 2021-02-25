import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import colors from '../../constants/colors';
import string from '../../constants/strings';

export const EntryScreen = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.topContainer}>
                <Text style={styles.entryTitle}>{string.ENTRY_TITLE}</Text>
                <Text>{string.ENTRY_SUBTITLE}</Text>
            </View>
            <View style={styles.midContainer}>
                <TouchableOpacity style={styles.yellowButton}>
                    <Text style={styles.textInButton}>{string.START_BUTTON}</Text>
                </TouchableOpacity>

                <View style={styles.haveAccountStyle}>
                    <Text>{string.HAVE_ACCOUNT}</Text>
                    <TouchableOpacity>
                        <Text>{string.LOGIN}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Image
                    source={{uri: 'https://easydrawingguides.com/wp-content/uploads/2017/02/How-draw-a-cartoon-panda-20.png'}}
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        height: '30%',
    },
    midContainer: {
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        borderWidth: 3,
        height: '40%',
    },
    container: {
        flex: 1,
        padding: 30,
    },
    entryTitle: {
        fontSize: 35,
        marginBottom: 30,
        fontWeight: 'bold',
        marginTop: 30,
    },
    yellowButton: {
        marginBottom: 30,
        backgroundColor: colors.YELLOW,
        height: 50,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    textInButton: {
        fontWeight: 'bold',
    },
    haveAccountStyle: {
        flexDirection: 'row',
    },

});
