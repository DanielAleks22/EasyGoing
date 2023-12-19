// styles.js

import { StyleSheet } from 'react-native';

export const searchRestaurantStyle = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    numberPickerContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30,
    },
    slider: {
        width: 300,
        height: 40,
    },
    topImage: {
        width: '100%',
        position: 'absolute',
        top: -5,
        height: 175,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    safeAreaView: {
        flex: 1,
        marginTop: 60,
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        color: 'white',
        marginTop: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    addressInput: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        color: 'white',
    },
    keywordInput: {
        width: '90%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingLeft: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        marginTop: 20,
    },
    pickerContainer: {
        height: 30,
        width: 200,
        marginTop: 20,
    },
    distanceText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
        alignSelf: 'center', 
        textAlign: 'center', 
        marginTop: 20, 
    },
    searchButtonContainer: {
        marginTop: 60,
        alignSelf: 'center',
    },
    searchButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    resultsScrollView: {
        marginTop: 20,
    },
    errorText: {
        marginTop: 20,
        color: 'red',
        textAlign: 'center',
    },
    searchPromptText: {
        marginTop: 20,
        textAlign: 'center',
    },
    // Additional styles as needed
});
