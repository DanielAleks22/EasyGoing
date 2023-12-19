
import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, TextInput, View, ScrollView, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { PlaceItem } from '../components/affichage_item.js';
import { fetchParkingsNearby } from '../service_api/googleServices.js';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';

//import pour le style
import { searchParkingStyle } from '../style/searchParkingScreenStyle.js';

function NumberPicker({ range, setRange }) {
    return (
        <View style={searchParkingStyle.numberPickerContainer}>
            <Slider
                style={searchParkingStyle.slider}
                minimumValue={1000}
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

function SearchParkingScreen({ route }) {
    const { address, coords } = route.params;
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const [data, setData] = useState(null);
    const [range, setRange] = useState(1000);
    const [error, setError] = useState("");
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        fetchParkingHandler(); 
    }, []);

    const fetchParkingHandler = async () => {
        setError("");
        setData(null);
        try {
            const response = await fetchParkingsNearby(coords.latitude, coords.longitude, range);
            setData(response);
        } catch (error) {
            console.error("Error fetching nearby parkings data:", error);
            setError("Error fetching nearby parkings data: " + error.message);
        }
    };

    const PinIcon = () => <Feather name="map-pin" size={30} color="#FF0000" />;

    const adresse = address || 'Adresse inconnue';

    return (
        <View style={searchParkingStyle.screenContainer}>
            <StatusBar barStyle="light-content" />
            <Image
                source={require("../assets/topBlack.png")}
                style={searchParkingStyle.topImage}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={searchParkingStyle.backButton}
            >
                <Icon name="arrow-circle-left" size={40} color="white" />
            </TouchableOpacity>
            <SafeAreaView style={searchParkingStyle.safeAreaView}>
                <Text style={searchParkingStyle.screenTitle}>Stationnement</Text>
                <View style={searchParkingStyle.addressContainer}>
                    <PinIcon />
                    <TextInput
                        placeholder={adresse}
                        placeholderTextColor="grey"
                        style={searchParkingStyle.addressInput}
                    />
                </View>
                <View style={searchParkingStyle.searchButtonContainer}>
                    <TouchableOpacity
                        onPress={fetchParkingHandler}
                        style={searchParkingStyle.searchButton}
                    >
                        <Text style={searchParkingStyle.searchButtonText}>Rechercher</Text>
                    </TouchableOpacity>
                </View>
                <Text style={searchParkingStyle.headingText}>Les Stationnements les plus proches</Text>
                <Text style={searchParkingStyle.distanceText}>Distance Maximale: {range} mètres</Text>
                <NumberPicker range={range} setRange={setRange} />
                {data ? (
                    <ScrollView style={searchParkingStyle.placesScrollView}
                        contentContainerStyle={searchParkingStyle.scrollViewContent}>
                        {data.map((parking, index) => (
                            <PlaceItem
                                key={index}
                                name={parking.name}
                                rating={parking.rating}
                                vicinity={parking.vicinity}
                                photoUrl={parking.photoUrl}
                            />
                        ))}
                    </ScrollView>
                ) : error ? (
                    <Text style={searchParkingStyle.errorText}>{error}</Text>
                ) : (
                    <Text style={searchParkingStyle.searchPromptText}>Recherchez les places de parking...</Text>
                )}
            </SafeAreaView>
        </View>
    );
}

export { SearchParkingScreen };
