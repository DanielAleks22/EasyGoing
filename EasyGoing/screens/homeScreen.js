import { LinearGradient } from 'expo-linear-gradient';
import { GOOGLE_PLACES_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Animated, View, StatusBar, TouchableOpacity, Text, Dimensions, FlatList, Clipboard, Button, TextInput, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import Feather from 'react-native-vector-icons/Feather'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, database } from '../firebaseConfig'; 
import { ref, set, push, onValue } from 'firebase/database';

//import pour le style
import { homeStyle } from '../style/homeStyle.js'; 

const categories = [
    { id: 1, title: "Meteo", logo: "cloud", },
    { id: 2, title: "Trajet", logo: "road", },
    { id: 3, title: "Parc", logo: "tree", },
    { id: 4, title: "Stationnement", logo: "car", },
    { id: 5, title: "Restaurant", logo: "cutlery", },
    { id: 6, title: "Bar", logo: "glass", },
];

function HomeScreen() {
    const [address, setAddress] = useState('');
    const [history, setHistory] = useState([]);
    const [coords, setCoords] = useState(null);
    const [adresse, setAdresse] = useState('Adresse');
    const navigation = useNavigation();
    const [userHistory, setUserHistory] = useState([]);

    const PinIcon = () => <Feather name="map-pin" size={30} color="#FF0000" />;

    useEffect(() => {
        const userId = auth.currentUser.uid;
        const historyRef = ref(database, 'users/' + userId + '/history');

        onValue(historyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserHistory(Object.values(data));
            }
        });

        return () => off(historyRef);
    }, []);

    const addToHistory = (newAddress) => {
        if (newAddress && !userHistory.includes(newAddress)) {
            const userId = auth.currentUser.uid;
            const newHistoryRef = push(ref(database, 'users/' + userId + '/history'));
            set(newHistoryRef, newAddress);
        }
    };

    return (
        <View style={homeStyle.screenContainer}>
            <StatusBar barStyle="light-content" />
            <Image
                source={require("../assets/topBlack.png")}
                style={homeStyle.topImage}
            />
            <SafeAreaView style={homeStyle.safeAreaView}>
                <View style={homeStyle.addressContainer}>
                    <PinIcon />
                    <Text style={homeStyle.addressText}>
                        {adresse}
                    </Text>
                </View>
                <View style={homeStyle.autoCompleteContainer}>
                    <GooglePlacesAutocomplete
                        placeholder="Entrez une adresse..."
                        onPress={(data, details = null) => {
                            setAddress(data.description);
                            addToHistory(data.description);
                            setAdresse(data.description);
                            if (details && details.geometry) {
                                setCoords({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                });
                            }
                        }}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'fr',
                            components: 'country:ca',
                        }}
                        fetchDetails
                        styles={{
                            textInputContainer: homeStyle.textInputContainer,
                            textInput: homeStyle.textInput,
                            listView: homeStyle.listView,
                        }}
                    />
                </View>
                <View style={homeStyle.categoryContainer}>
                    <FlatList
                        numColumns={2} 
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => handleCategoryPress(item)}
                                    style={homeStyle.categoryButton}>
                                    <Icon name={item.logo} size={20} color="white" />
                                    <Text style={homeStyle.categoryText}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Historique', { history })}
                    style={homeStyle.historyButton}>
                    <Text style={homeStyle.historyButtonText}>Historique des recherches</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );

    function handleCategoryPress(item) {
        if (adresse !== "Adresse") {
            switch (item.title) {
                case 'Meteo':
                    navigation.navigate('Météo', { adresse: adresse, coords: coords });
                    break;
                case 'Parc':
                    navigation.navigate('SearchPark', { adresse: adresse, coords: coords });
                    break;
                case 'Bar':
                    navigation.navigate('SearchBar', { adresse: adresse, coords: coords });
                    break;
                case 'Restaurant':
                    navigation.navigate('SearchRestaurant', { adresse: adresse, coords: coords });
                    break;
                case 'Stationnement':
                    navigation.navigate('SearchParking', { adresse: adresse, coords: coords });
                    break;
                case 'Trajet':
                    navigation.navigate('Route', { adresse: adresse, coords: coords });
                    break;
                default:
                    alert("Veuillez choisir une adresse valide.");
            }
        } else {
            alert("Veuillez choisir une adresse valide.");
        }
    }
}

export { HomeScreen };