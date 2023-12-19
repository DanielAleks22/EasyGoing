// SearchBarScreen.js

import React, { useState, useEffect } from 'react';
import { Animated, TouchableOpacity, Text, TextInput, View, ScrollView, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { PlaceItem } from '../components/affichage_item.js';
import { fetchBarsNearby } from '../service_api/googleServices.js';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';

//import pour le style 
import { stylesSearchBarScreen } from '../style/searchBarScreenStyle.js'; 


function NumberPicker({ range, setRange }) {
    return (
        <View style={stylesSearchBarScreen.numberPickerContainer}>
            <Slider
                style={stylesSearchBarScreen.slider}
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

function SearchBarScreen({ route }) {
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
        fetchBarHandler();
    }, []);

    const fetchBarHandler = async () => {
        setError("");
        setData(null);
        try {
            const response = await fetchBarsNearby(coords.latitude, coords.longitude, range);
            setData(response);
        } catch (error) {
            console.error("Error fetching nearby bars data:", error);
            setError("Error fetching nearby bars data: " + error.message);
        }
    };
    
    const handleRangeChange = (value) => {
        setRange(Math.round(value));
        fetchBarHandler();
    };

    const PinIcon = () => <Feather name="map-pin" size={30} color="#FF0000" />;

    return (
        <View style={stylesSearchBarScreen.screenContainer}>
            <StatusBar barStyle="light-content" />
            <Image
                source={require("../assets/topBlack.png")}
                style={stylesSearchBarScreen.topImage}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={stylesSearchBarScreen.backButton}
            >
                <Icon name="arrow-circle-left" size={40} color="white" />
            </TouchableOpacity>
            <SafeAreaView style={stylesSearchBarScreen.safeAreaView}>
                <Text style={stylesSearchBarScreen.screenTitle}>Bar</Text>
                <View style={stylesSearchBarScreen.addressContainer}>
                    <PinIcon />
                    <TextInput
                        placeholder={address || 'Adresse inconnue'}
                        placeholderTextColor="grey"
                        style={stylesSearchBarScreen.addressInput}
                    />
                </View>
                <Text style={stylesSearchBarScreen.maxDistanceText}> Distance Maximal: {range} mètres </Text>
                <NumberPicker range={range} setRange={handleRangeChange} />
                <View style={stylesSearchBarScreen.searchButtonContainer}>
                    <TouchableOpacity
                        onPress={fetchBarHandler}
                        style={stylesSearchBarScreen.searchButton}
                    >
                        <Text style={stylesSearchBarScreen.searchButtonText}>Rechercher</Text>
                    </TouchableOpacity>
                    {data ? (
                        <ScrollView style={stylesSearchBarScreen.placesScrollView}
                            contentContainerStyle={stylesSearchBarScreen.scrollViewContent}>
                            {data.map((bar, index) => (
                                <PlaceItem
                                    key={index}
                                    name={bar.name}
                                    rating={bar.rating}
                                    vicinity={bar.vicinity}
                                    photoUrl={bar.photoUrl}
                                />
                            ))}
                        </ScrollView>
                    ) : error ? (
                        <Text style={stylesSearchBarScreen.errorText}>{error}</Text>
                    ) : (
                        <Text style={stylesSearchBarScreen.searchPromptText}>Recherchez les bars...</Text>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}

export { SearchBarScreen };
