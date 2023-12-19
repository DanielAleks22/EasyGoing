import { LinearGradient } from 'expo-linear-gradient'
import { Animated, View, TouchableOpacity, Text, FlatList, StatusBar, Button, TextInput, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RestaurantItem } from '../components/affichage_item.js';
import { fetchPlacesNearby } from '../service_api/googleServices.js';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

//import pour le style
import { searchRestaurantStyle  } from '../style/searchRestaurantStyle.js'; 

function NumberPicker({ range, setRange }) {
    return (
        <View style={searchRestaurantStyle.numberPickerContainer}>
            <Slider
                style={searchRestaurantStyle.slider}
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

function SearchRestaurantScreen({ route }) {
    const { address, coords } = route.params;
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const [minPrix, setMinPrix] = useState(0);
    const [maxPrix, setMaxPrix] = useState(4);
    const [range, setRange] = useState(800);
    const [motCle, setMotCle] = useState("");
    const [nombreDePersonnes, setNombreDePersonnes] = useState(1);
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const navigation = useNavigation();
    const type = "restaurant";

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        fetchRestaurantsNearbyHandler();
    }, []);

    const fetchRestaurantsNearbyHandler = async () => {
        setError("");
        setData(null);
        try {
            const response = await fetchPlacesNearby(coords.latitude, coords.longitude, type, range, minPrix, maxPrix, motCle);
            setData(response);
        } catch (error) {
            console.error("Error fetching nearby places data:", error);
            setError("Error fetching nearby places data");
        }
    };

    const handleMotCleChange = (value) => {
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '');
        setMotCle(sanitizedValue);
    };

    const handlePriceChange = (values) => {
        setMinPrix(values[0]);
        setMaxPrix(values[1]);
    };

    const PinIcon = () => <Feather name="map-pin" size={30} color="#FF0000" />;

    const adresse = address || 'Adresse inconnue';

    return (
        <View style={searchRestaurantStyle.screenContainer}>
            <StatusBar barStyle="light-content" />
            <Image
                source={require("../assets/topBlack.png")}
                style={searchRestaurantStyle.topImage}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={searchRestaurantStyle.backButton}
            >
                <Icon name="arrow-circle-left" size={40} color="white" />
            </TouchableOpacity>
            <SafeAreaView style={searchRestaurantStyle.safeAreaView}>
                <Text style={searchRestaurantStyle.headingText}>Restaurant</Text>
                <View style={searchRestaurantStyle.addressContainer}>
                    <PinIcon />
                    <TextInput
                        placeholder={adresse}
                        placeholderTextColor="grey"
                        style={searchRestaurantStyle.addressInput}
                    />
                </View>
                <TextInput
                    placeholder="Mot-clé (ex: sushi, burger...)"
                    onChangeText={handleMotCleChange}
                    style={searchRestaurantStyle.keywordInput}
                />
                <View style={searchRestaurantStyle.pickerContainer}>
                    <Picker
                        selectedValue={nombreDePersonnes}
                        onValueChange={(itemValue) => setNombreDePersonnes(itemValue)}
                    >
                        {/* Picker Items */}
                    </Picker>
                </View>
                <Text style={searchRestaurantStyle.distanceText}>Distance Maximale: {range} mètres</Text>
                <NumberPicker range={range} setRange={setRange} />
                <View style={searchRestaurantStyle.searchButtonContainer}>
                    <TouchableOpacity
                        onPress={fetchRestaurantsNearbyHandler}
                        style={searchRestaurantStyle.searchButton}
                    >
                        <Text style={searchRestaurantStyle.searchButtonText}>Rechercher</Text>
                    </TouchableOpacity>
                    {data ? (
                        <ScrollView style={searchRestaurantStyle.resultsScrollView}>
                            {data.map((restaurant, index) => (
                                <RestaurantItem key={index} {...restaurant} />
                            ))}
                        </ScrollView>
                    ) : error ? (
                        <Text style={searchRestaurantStyle.errorText}>{error}</Text>
                    ) : (
                        <Text style={searchRestaurantStyle.searchPromptText}>...</Text>
                    )}
                </View>
            </SafeAreaView>
        </View>
    );
}

export { SearchRestaurantScreen };