import { LinearGradient } from 'expo-linear-gradient'
import { Animated, View, TouchableOpacity, Text, FlatList, StatusBar, Button, TextInput, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { PlaceItem } from '../components/affichage_item.js';
import { fetchParksNearby } from '../service_api/googleServices.js';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

//import pour le style
import { searchParkStyle } from '../style/searchParkStyle.js'; 

function NumberPicker({ range, setRange }) {
    return (
        <View style={searchParkStyle.numberPickerContainer}>
            <Slider
                style={searchParkStyle.slider}
                minimumValue={800}
                maximumValue={3000}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                thumbTintColor="#000000" 
                onValueChange={(value) => setRange(Math.round(value))}
                value={range}
            />
        </View>
    );
}

function SearchParkScreen({ route }) {
    const { address, coords } = route.params;
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const [data, setData] = useState(null);
    const [range, setRange] = useState(800);
    const [error, setError] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        fetchParkHandler(); 
    }, []);

    const fetchParkHandler = async () => {
        setError("");
        setData(null);
        try {
            const response = await fetchParksNearby(coords.latitude, coords.longitude, range);
            setData(response);
        } catch (error) {
            console.error("Error fetching nearby parks data:", error);
            setError("Error fetching nearby parks data: " + error.message);
        }
    };

    const PinIcon = () => <Feather name="map-pin" size={30} color="#FF0000" />;

    const adresse = address || 'Adresse inconnue';

    return (
        <View style={searchParkStyle.screenContainer}>
            <StatusBar barStyle="light-content" />
            <Image
                source={require("../assets/topBlack.png")}
                style={searchParkStyle.topImage}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={searchParkStyle.backButton}
            >
                <Icon name="arrow-circle-left" size={40} color="white" />
            </TouchableOpacity>
            <SafeAreaView style={searchParkStyle.safeAreaView}>
                <Text style={searchParkStyle.screenTitle}>Parc</Text>
                <View style={searchParkStyle.addressContainer}>
                    <PinIcon />
                    <TextInput
                        placeholder={adresse}
                        placeholderTextColor="grey"
                        style={searchParkStyle.addressInput}
                    />
                </View>
                <Text style={searchParkStyle.headingText}>Les parcs plus proches</Text>
                <Text style={searchParkStyle.distanceText}>Distance Maximale: {range} mètres</Text>
                <NumberPicker range={range} setRange={setRange} />
                <View style={searchParkStyle.searchButtonContainer}>
                    <TouchableOpacity
                        onPress={fetchParkHandler}
                        style={searchParkStyle.searchButton}
                    >
                        <Text style={searchParkStyle.searchButtonText}>Rechercher</Text>
                    </TouchableOpacity>
                    {data ? (
                        <ScrollView style={searchParkStyle.placesScrollView}
                            contentContainerStyle={searchParkStyle.scrollViewContent}>
                            {data.map((park, index) => (
                                <PlaceItem
                                    key={index}
                                    name={park.name}
                                    rating={park.rating}
                                    vicinity={park.vicinity}
                                    photoUrl={park.photoUrl} 
                                />
                            ))}
                        </ScrollView>
                    ) : error ? (
                        <Text style={searchParkStyle.errorText}>{error}</Text>
                    ) : (
                        <Text style={searchParkStyle.searchPromptText}>Recherchez les parcs...</Text>
                    )}
                </View>
            </SafeAreaView>
        </View>
    )
}
export { SearchParkScreen }; 