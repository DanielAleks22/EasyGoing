import { styles } from '../style/styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, View, TouchableOpacity, StatusBar, Text, FlatList, Clipboard, Button, TextInput, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchWeatherData } from '../service_api/weatherServices.js';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


const astroInfo = [
    {
        mois: "Janvier",
        signe: "Capricorne",
        description: "Les Capricornes sont connus pour leur sérieux et leur détermination.",
        aEviter: "Ils doivent éviter la rigidité et le pessimisme."
    },
    {
        mois: "Février",
        signe: "Verseau",
        description: "Les Verseau sont créatifs et indépendants, avec un esprit humanitaire.",
        aEviter: "Ils doivent éviter l'excentricité et l'isolement social."
    },
    {
        mois: "Mars",
        signe: "Poissons",
        description: "Les Poissons sont empathiques et artistiques, avec une grande intuition.",
        aEviter: "Ils doivent éviter d'être submergés par les émotions et de fuir la réalité."
    },
    {
        mois: "Avril",
        signe: "Bélier",
        description: "Les Béliers sont dynamiques et courageux, prenant souvent l'initiative.",
        aEviter: "Ils doivent éviter l'impulsivité et les décisions hâtives."
    },
    {
        mois: "Mai",
        signe: "Taureau",
        description: "Les Taureaux sont fiables et apprécient la stabilité.",
        aEviter: "Ils doivent éviter le matérialisme et la résistance au changement."
    },
    {
        mois: "Juin",
        signe: "Gémeaux",
        description: "Les Gémeaux sont communicatifs et curieux, apprenant rapidement.",
        aEviter: "Ils doivent éviter la nervosité et l'indécision."
    },
    {
        mois: "Juillet",
        signe: "Cancer",
        description: "Les Cancers sont protecteurs et émotifs, avec un fort instinct familial.",
        aEviter: "Ils doivent éviter la sensibilité excessive et le repli sur soi."
    },
    {
        mois: "Août",
        signe: "Lion",
        description: "Les Lions sont généreux et chaleureux, avec un esprit de leader.",
        aEviter: "Ils doivent éviter l'arrogance et la vanité."
    },
    {
        mois: "Septembre",
        signe: "Vierge",
        description: "Les Vierges sont méthodiques et travaillent avec attention aux détails.",
        aEviter: "Ils doivent éviter la critique excessive et l'inquiétude."
    },
    {
        mois: "Octobre",
        signe: "Balance",
        description: "Les Balances recherchent l'équilibre et la diplomatie, avec un sens esthétique.",
        aEviter: "Ils doivent éviter l'indécision et l'évitement des confrontations."
    },
    {
        mois: "Novembre",
        signe: "Scorpion",
        description: "Les Scorpions sont passionnés et résilients, avec une forte intuition.",
        aEviter: "Ils doivent éviter la jalousie, le secret et la manipulation."
    },
    {
        mois: "Décembre",
        signe: "Sagittaire",
        description: "Les Sagittaires sont optimistes et aventureux, avec un esprit libre.",
        aEviter: "Ils doivent éviter l'irresponsabilité et l'impatience."
    }
];

const jours = [
    { jour: 'Lundi', temperature: '5°C' },
    { jour: 'Mardi', temperature: '0°C' },
    { jour: 'Mercredi', temperature: '-2°C' },
    { jour: 'Jeudi', temperature: '3°C' },
    { jour: 'Vendredi', temperature: '3°C' },
    { jour: 'Samedi', temperature: '2°C' },
    { jour: 'Dimanche', temperature: '3°C' },
];
function AstroScreen() {
    const moisActuel = new Date().getMonth();

    const astroDuMois = astroInfo[moisActuel];

    return (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                alignItems: 'flex-start'
            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>
                    Astrologie
                </Text>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
                    {astroDuMois.mois} - {astroDuMois.signe}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5 }}>
                    Points Positifs: {astroDuMois.description}
                </Text>
                <Text style={{ fontSize: 16, marginTop: 5 }}>
                    À Éviter: {astroDuMois.aEviter}
                </Text>
            </View>
        </View>
    );
}

const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
};

function WeatherScreen({ route }) {

    const { address, coords } = route.params;
    const [weather, setWeather] = useState({
        main: { temp: 0, feels_like: 0, humidity: 0 },
        wind: { speed: 0 },
        weather: [{ description: "" }],
    }); const [opacity, setOpacity] = useState(new Animated.Value(0));

    const PinIcon = () => {
        return <Feather name="map-pin" paddingLeft={40}
        size={30} color="#FF0000" />
            ;
    };

    const adresse = route.params ? route.params.adresse : 'Adresse inconnue';
    const navigation = useNavigation();




    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const handleFetchWeather = async () => {
            try {
                if (coords) {
                    const data = await fetchWeatherData(coords.latitude, coords.longitude);
                    setWeather(data);
                    console.log(data);
                } else {
                    console.error("No coordinates available");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        handleFetchWeather();
    }, [coords]);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle="light-content" />
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')} 
                style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}
            >
                <Icon name="arrow-circle-left" size={40} color="white" />
            </TouchableOpacity>
            <Image
                source={require("../assets/topBlack.png")}
                style={{ width: '100%', position: 'absolute', top: -5, height: 175 }}
            />
            <SafeAreaView style={{ flex: 1, marginTop: 60 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 8, color: 'white' }}
                >Meteo</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <PinIcon />
                    <TextInput
                        placeholder={adresse}
                        placeholderTextColor="grey"
                        style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 8, color: 'white' }}
                    />
                </View>
                <View style={{
                    backgroundColor: 'white', 
                    margin: 20, 
                    padding: 15, 
                    borderRadius: 10, 
                    shadowColor: '#000', 
                    shadowOffset: { width: 0, height: 2 }, 
                    shadowOpacity: 0.3, 
                    shadowRadius: 4, 
                    elevation: 5, 
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 80, marginLeft: 8 }}>
                        {kelvinToCelsius(weather.main.temp) + '°C'}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                            Ressentie :
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                            {kelvinToCelsius(weather.main.feels_like) + '°C'}
                        </Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 40, marginLeft: 8, color: 'grey' }}>
                        {weather.weather[0].description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                            Humidité :
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                            {weather.main.humidity}%
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                            Rafales :
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 8 }}>
                            {weather.wind.speed} m/s
                        </Text>
                    </View>

                </View>
                <View style={{
                    backgroundColor: 'white',
                    margin: 15,
                    padding: 15,
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5,
                }}>
                    <FlatList
                        data={jours}
                        horizontal
                        keyExtractor={item => item.jour}
                        renderItem={({ item }) => (
                            <View style={{ alignItems: 'center', marginRight: 15 }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.jour}</Text>
                                <Text style={{ color: 'black', marginTop: 10 }}>{item.temperature}</Text>
                            </View>
                        )}
                    />
                </View>
                <AstroScreen />
            </SafeAreaView >
        </View>
    );
}

export { WeatherScreen };
