// HistoryScreenStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    animatedView: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    backButton: {
        position: 'absolute', 
        top: 10, 
        left: 10, 
        zIndex: 10
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginVertical: 20
    },
    listItem: {
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 3,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 5
    },
    itemText: {
        color: 'black', 
        fontSize: 16
    }
});
