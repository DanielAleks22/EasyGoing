// styles.js

import { StyleSheet, Dimensions } from 'react-native';

const buttonWidth = Dimensions.get('window').width / 2 - 40;

export const homeStyle = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    topImage: {
        width: '100%',
        position: 'absolute',
        top: -5,
        height: 175,
    },
    safeAreaView: {
        flex: 1,
        marginTop: 40,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addressText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        color: 'white',
    },
    autoCompleteContainer: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        zIndex: 5,
    },
    textInputContainer: {
        width: '90%',
        alignSelf: 'center',
    },
    textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
    },
    listView: {
        backgroundColor: 'white',
    },
    categoryContainer: {
        paddingHorizontal: 20,
        marginTop: 90,
    },
    categoryButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        paddingHorizontal: 20,
        marginBottom: 20,
        marginHorizontal: 10,
        width: buttonWidth,
        borderRadius: 25,
        backgroundColor: 'black',
        marginTop: 40,
    },
    categoryText: {
        fontWeight: 'bold',
        color: 'white',
    },
    historyButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        alignSelf: 'center',
        marginTop: 20,
    },
    historyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // Add additional styles as needed
});
