import { StyleSheet } from 'react-native';

export const searchParkStyle = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    numberPickerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 30
    },
    slider: {
        width: 300,
        height: 40
    },
    topImage: {
        width: '100%',
        position: 'absolute',
        top: -5,
        height: 175
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10
    },
    safeAreaView: {
        flex: 1,
        marginTop: 60
    },
    screenTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        color: 'white'
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    addressInput: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
        color: 'white'
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 8,
        color: 'black',
        marginTop: 50
    },
    distanceText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    },
    searchButtonContainer: {
        marginTop: 60
    },
    searchButton: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        alignSelf: 'center'
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    placesScrollView: {
        marginTop: 20
    },
    scrollViewContent: {
        paddingBottom: 100
    },
    errorText: {
        marginTop: 20,
        color: 'red'
    },
    searchPromptText: {
        marginTop: 20
    }
});
