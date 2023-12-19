import { styles } from '../style/styles.js';
import { LinearGradient } from 'expo-linear-gradient'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '@env';
import { fetchRoute } from '../service_api/googleServices.js';
import { Animated, View, TouchableOpacity, Text, FlatList, StatusBar, Dimensions, Button, TextInput, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import Slider from '@react-native-community/slider'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import Feather from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const transportationModes = [
    { id: 'car', title: 'Automobile', icon: 'car' },
    { id: 'walking', title: 'À pied', icon: 'male' },
    { id: 'bicycling', title: 'Vélo', icon: 'bicycle' },
    { id: 'transit', title: 'Autobus', icon: 'bus' },
];

function RouteScreen({ route }) {
    const { address, coords } = route.params;
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const [travelMode, setTravelMode] = useState("");
    const [origine, setOrigine] = useState("");
    const [coordsOrigine, setCoordsOrigine] = useState("");
    const [routeData, setRouteData] = useState("");
    const [directions, setDirections] = useState([]);
    const [error, setError] = useState("");
    const [routeSteps, setRouteSteps] = useState([]);
    const [mapRegion, setMapRegion] = useState(null);
    const [showMap, setShowMap] = useState(false); 
    const [showSteps, setShowSteps] = useState(false); 
    const [publicTransportSchedule, setPublicTransportSchedule] = useState([]);
    const navigation = useNavigation();
    const adresse = route.params ? route.params.adresse : 'Adresse inconnue';
    const [isManualEntryEnabled, setIsManualEntryEnabled] = useState(false);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const promptForLocationChoice = () => {
            Alert.alert(
                "Point de depart",
                "Voulez-vous utiliser votre localisation courante comme point de depart?",
                [
                    { text: "Oui", onPress: () => fetchCurrentLocation() },
                    { text: "Non", onPress: () => enableManualLocationEntry() }
                ],
                { cancelable: false }
            );
        };
    
        promptForLocationChoice();
    }, []);

    const iconStyle = (mode) => ({
        fontSize: travelMode === mode ? 40 : 32,
        color: travelMode === mode ? '#e67e22' : '#3498db',
    });

    const removeHtmlTags = (str) => {
        if (!str) return '';
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    };

    const fetchRouteHandler = async () => {
        if (coordsOrigine == "") {
            setError("Erreur: Auncun point d'origine donné!");
        } else if (travelMode == "") {
            setError("Erreur: Aucun mode de transport sélectioné!");
        } else {
            setError("");

            try {
                let data = await fetchRoute(coords.latitude, coords.longitude, coordsOrigine.latitude, coordsOrigine.longitude, travelMode);
                if (data.status === "OK") {
                    const points = data.routes[0].overview_polyline.points;
                    const decodedSteps = decode(points).map(point => ({ latitude: point[0], longitude: point[1] }));
                    setRouteData(decodedSteps);
                    setDirections(data.routes[0].legs[0].steps);

                    const itinerarySteps = data.routes[0].legs[0].steps.map(step => ({
                        latitude: step.start_location.lat,
                        longitude: step.start_location.lng,
                        instruction: step.html_instructions
                    }));
                    setRouteSteps(itinerarySteps);
                    if (travelMode === 'transit' && data.transitDetails) {
                        setPublicTransportSchedule(data.transitDetails);
                    }

                    setMapRegion({
                        latitude: (coordsOrigine.latitude + coords.latitude) / 2,
                        longitude: (coordsOrigine.longitude + coords.longitude) / 2,
                        latitudeDelta: Math.abs(coordsOrigine.latitude - coords.latitude) * 2,
                        longitudeDelta: Math.abs(coordsOrigine.longitude - coords.longitude) * 2,
                    });
                    setShowMap(true);
                } else {
                    setError("Erreur: Itinéraire non trouvé!");
                }
            } catch (error) {
                setError("Erreur: Récupération de l'itinéraire impossible!" + error);
            }

        }
    }
    const PinIcon = () => {
        return <Feather name="map-pin" size={30} paddingLeft={40} color="#FF0000" />
            ;
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => selectTravelMode(item.id)}>
            <Icon name={item.icon} style={iconStyle(item.id)} />
        </TouchableOpacity>
    );

    const selectTravelMode = (mode) => {
        setTravelMode(mode);
    };

    const fetchCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setError('Permission pour utiliser ladresse courante est refuser');
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setCoordsOrigine({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });    
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${encodeURIComponent(GOOGLE_PLACES_API_KEY)}`);
            const data = await response.json();
            console.log(data);
            if (data.results.length > 0) {
                setOrigine(data.results[0].formatted_address);
            } else {
                setOrigine("Adresse courante");
            }
        } catch (error) {
            console.error(error);
            setOrigine("Adresse courante");
        }
    };

    const enableManualLocationEntry = () => {
        setIsManualEntryEnabled(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="light-content" />
            <Image
                source={require("../assets/topBlack.png")}
                style={{ width: '100%', position: 'absolute', top: -5, height: 175 }}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')} 
                style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}
            >
                <FontAwesome name="arrow-circle-left" size={40} color="white" />
            </TouchableOpacity>

            <SafeAreaView style={{ flex: 1, marginTop: 60 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 8, color: 'white' }}>Chemin </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <PinIcon />
                    <TextInput
                        placeholder={adresse}
                        placeholderTextColor="grey"
                        style={{ fontWeight: 'bold', fontSize: 16,padding: 10, marginLeft: 8, color: 'white' }}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    marginTop: 17,
                    top: 70,
                    left: 0,
                    right: 0,
                    zIndex: 5
                }}>
                    {isManualEntryEnabled && (
                        <GooglePlacesAutocomplete
                            placeholder="Entrez le point d'origine..."
                            onPress={(data, details = null) => {
                                if (details && details.geometry) {
                                    setCoordsOrigine({
                                        latitude: details.geometry.location.lat,
                                        longitude: details.geometry.location.lng,
                                    });
                                    setOrigine(data.description);
                                }
                            }}
                            query={{
                                key: GOOGLE_PLACES_API_KEY,
                                language: 'fr, en',
                                components: 'country:ca',
                            }}
                            styles={{
                                textInputContainer: {
                                    width: '90%',
                                    alignSelf: 'center',
                                    backgroundColor: '#fff',
                                    borderRadius: 20,
                                    paddingLeft: 15,
                                    fontSize: 16,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1,
                                    elevation: 2,
                                },
                                textInput: {
                                    height: 40,
                                    color: '#5d5d5d',
                                    fontSize: 16,
                                },
                                listView: {
                                    backgroundColor: '#5d5d5d',
                                },
                            }}
                            fetchDetails
                        />
                    )}
                    {!isManualEntryEnabled && origine !== "" && (
                        <View style={styles.currentLocationContainer}>
                            <Text style={styles.currentLocationLabel}>Adresse courante:</Text>
                            <Text style={styles.currentLocationText}>{origine}</Text>
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: 20 }}>
                        {transportationModes.map((mode) => (
                            <TouchableOpacity
                                key={mode.id}
                                onPress={() => selectTravelMode(mode.id)}
                                style={{
                                    backgroundColor: travelMode === mode.id ? 'black' : 'white',
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    borderRadius: 20,
                                    margin: 5,
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: 'black'
                                }}
                            >
                                <FontAwesome
                                    name={mode.icon}
                                    size={20}
                                    color={travelMode === mode.id ? 'white' : 'black'}
                                />
                                <Text style={{
                                    color: travelMode === mode.id ? 'white' : 'black',
                                    fontWeight: 'bold',
                                    marginTop: 5
                                }}>
                                    {mode.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={{
                        backgroundColor: 'black',
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        borderRadius: 20,
                        alignSelf: 'center',
                        marginTop: 20
                    }} onPress={fetchRouteHandler}>
                        <Text style={styles.viewHistoryButtonText}>Chercher itinéraire</Text>
                    </TouchableOpacity>
                </View>

                {error ? (
                    <Text> {error}</Text>
                ) : showMap && (
                    <View style={{ flex: 1 }}>
                        <MapView
                            style={{ flex: 1, width: screenWidth }}
                            region={mapRegion}
                            showsUserLocation={true}
                        >
                            {routeSteps.map((step, index) => (
                                <Marker
                                    key={`step-${index}`}
                                    coordinate={{ latitude: step.latitude, longitude: step.longitude }}
                                    title={`Étape ${index + 1}`}
                                    description={removeHtmlTags(step.instruction)}
                                />
                            ))}
                            {routeData && (
                                <Polyline
                                    coordinates={routeData}
                                    strokeWidth={4}
                                    strokeColor="blue"
                                />
                            )}
                        </MapView>
                        <TouchableOpacity
                            style={styles.viewHistoryButton}
                            onPress={() => setShowSteps(!showSteps)}
                        >
                            <Text style={styles.viewHistoryButtonText }>
                                {showSteps ? 'Masquer les étapes' : 'Voir les étapes'}
                            </Text>
                        </TouchableOpacity>
                        {showSteps && (
                            <FlatList
                                style={{ flex: 0.3 }}
                                data={directions}
                                keyExtractor={(item, index) => `step-${index}`}
                                renderItem={({ item, index }) => {
                                    let stepDetails = "";
                                    switch (item.travel_mode) {
                                        case "DRIVING":
                                            stepDetails = `Drive: ${removeHtmlTags(item.html_instructions)}`;
                                            break;
                                        case "WALKING":
                                            stepDetails = `Walk: ${removeHtmlTags(item.html_instructions)}`;
                                            break;
                                        case "BICYCLING":
                                            stepDetails = `Bike: ${removeHtmlTags(item.html_instructions)}`;
                                            break;
                                        case "TRANSIT":
                                            const transitInfo = item.transit_details;
                                            stepDetails = transitInfo.line.vehicle.type === "BUS"
                                                ? `Take bus ${transitInfo.line.short_name} from ${transitInfo.departure_stop.name} at ${transitInfo.departure_time.text} to ${transitInfo.arrival_stop.name}`
                                                : `Take the metro from ${transitInfo.departure_stop.name} towards ${transitInfo.headsign} arriving at ${transitInfo.arrival_stop.name}`;
                                            break;
                                        default:
                                            stepDetails = removeHtmlTags(item.html_instructions);
                                    }

                                    return (
                                        <View style={styles.stepText}>
                                            <Text>{`Step ${index + 1}: ${stepDetails}`}</Text>
                                        </View>
                                    );
                                }}
                            />
                        )}
                    </View>
                )}
            </SafeAreaView>
        </View>
    );

}

export { RouteScreen };