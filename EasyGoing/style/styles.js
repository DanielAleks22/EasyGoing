import { StyleSheet } from 'react-native';
import { forFadeAndScale } from '../service/animations.js';


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      flex: 1,
      padding: 15,
      borderWidth: 1,
      borderColor: '#e67e22',
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      fontWeight: 'bold',
    },
    iconsContainer: {
      flexDirection: 'row',
    },
    iconButton: {
      padding: 20,
      margin: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3498db',
    },
    historyTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 8,
      marginBottom: 10,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 5,
    },
    historyItemContainer: {
      padding: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      marginBottom: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#3498db',
    },
    historyItem: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#3498db',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#e67e22',
      borderRadius: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    viewHistoryButton: {
      padding: 15,
      backgroundColor: 'black',
      borderRadius: 8,
      marginTop: 20,
      elevation: 5,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: 'black',
      shadowOpacity: 0.3,
    },
    viewHistoryButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 18,
    },
    historyScreenHeader: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
    },
    weatherContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      margin: 10,
    },
    weatherInfo: {
      fontSize: 18,
      color: 'white',
      margin: 5,
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
    },
    listView: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
      borderRadius: 5,
      marginHorizontal: 10,
    },
    description: {
      fontWeight: 'bold',
      color: '#444',
    },
    separator: {
      height: 0.5,
      backgroundColor: '#ccc', 
    },
    poweredContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      borderBottomRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderColor: '#c8c7cc', 
      borderTopWidth: 0.5,
    },
    itemContainer: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    itemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#34495e',
    },
    itemRating: {
      color: '#7f8c8d',
    },
    itemVicinity: {
      color: '#95a5a6',
    },
    imageStyle: {
      width: '100%',
      height: 200,
      borderRadius: 8,
    },
    slider: {
      width: '100%',
      height: 40,
      marginTop: 8,
      marginBottom: 8,
    },
    multiSlider: {
      width: '100%',
      height: 40,
      marginTop: 8,
      marginBottom: 8,
    },
    button: {
      marginTop: 20,
      paddingVertical: 12,
      paddingHorizontal: 30,
      backgroundColor: '#f39c12',
      borderRadius: 25,
      borderWidth: 0,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
    labelText: {
      color: '#fff',
      fontSize: 16,
      marginTop: 8,
    },    

    stepText: {
      padding: 10,
      fontSize: 16,
      color: '#333',
    },
    currentLocationContainer: {
      padding: 10,

      backgroundColor:'black'
    },
    currentLocationLabel: {
        fontSize: 14,
        color: '#333',
    },
    currentLocationText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
  });

export const screenOptions = {
  cardStyleInterpolator: forFadeAndScale,
  headerTitleStyle: styles.historyScreenHeader,
  headerStyle: {
    backgroundColor: '#3498db',
  },
  headerTintColor: '#e67e22',
};