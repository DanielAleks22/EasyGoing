import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { screenOptions } from './style/styles.js';
import { LoginScreen } from './screens/loginScreen.js';
import { HomeScreen } from './screens/homeScreen.js';
import { WeatherScreen } from './screens/weatherScreen.js';
import { HistoryScreen } from './screens/historyScreen.js';
import { LocationScreen } from './screens/locationScreen.js';
import { SearchRestaurantScreen } from './screens/searchRestaurantScreen.js';
import { SearchParkScreen } from './screens/searchParkScreen.js';
import { SearchParkingScreen } from './screens/searchParkingScreen.js';
import { SearchBarScreen } from './screens/searchBarScreen.js';
import { RouteScreen } from './screens/routeScreen.js';


const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                name="Historique" 
                component={HistoryScreen} 
                options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Météo"
                    component={WeatherScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Location" component={LocationScreen} />
                <Stack.Screen
                    name="SearchRestaurant"
                    component={SearchRestaurantScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchPark"
                    component={SearchParkScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchBar"
                    component={SearchBarScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                name="SearchParking" 
                component={SearchParkingScreen} 
                options={{ headerShown: false }}
            />
                <Stack.Screen 
                name="Route" 
                component={RouteScreen} 
                options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}