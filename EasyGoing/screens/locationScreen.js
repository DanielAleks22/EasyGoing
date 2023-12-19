import { styles } from '../style/styles.js';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'
import { Animated, View, TouchableOpacity, Text, FlatList, Clipboard, Button, TextInput, ScrollView, Image  } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { stylesLocation } from '../style/locationScreenStyle.js'; 


function LocationScreen({ route }) {
  const { address, coords } = route.params;
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={['#3498db', '#e67e22']} style={stylesLocation.container}>
      <Animated.View style={{...stylesLocation.container, opacity: opacity}}>
        <Text> Places : {address}</Text>
        <View style={stylesLocation.iconsContainer}>
          <TouchableOpacity style={stylesLocation.iconButton} onPress={() => navigation.navigate('SearchRestaurant', { address, coords })}>
            <Icon name="restaurant-outline" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={stylesLocation.iconButton} onPress={() => navigation.navigate('SearchPark', { address, coords })}>
            <Icon name="leaf-outline" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={stylesLocation.iconButton} onPress={() => navigation.navigate('SearchBar', { address, coords })}>
            <Icon name="beer-outline" size={24} color="#ccc" />
          </TouchableOpacity>
          <TouchableOpacity style={stylesLocation.iconButton} onPress={() => navigation.navigate('SearchParking', { address, coords })}>
            <Icon name="car-outline" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
        <View>
          <Text> Route : </Text>
          <TouchableOpacity style={stylesLocation.iconButton} onPress={() => navigation.navigate('Route', { address, coords })}>
            <Icon name="map-outline" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

export { LocationScreen };