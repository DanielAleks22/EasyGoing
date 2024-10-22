import Icon from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { Animated, View, TouchableOpacity, Text, FlatList, Clipboard, Button, TextInput, ScrollView, Image  } from 'react-native';
import { styles } from '../style/styles.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const renderRating = (rating) => {
  if (rating === null || rating === undefined) {
    return <Text>N/A</Text>;
  }

  let stars = [];
  for (let i = 0; i < 5; i++) {
    let starName = 'star-o'; 
    if (i < Math.floor(rating)) {
      starName = 'star';
    } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
      starName = 'star-half-o';
    }
    stars.push(<FontAwesome key={i} name={starName} size={15} color="gold" />);
  }
  return stars;
};

const PlaceItem = ({ name, rating, vicinity, photoUrl }) => {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
    }}>
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }} />
      ) : (
        <Icon name="camera-outline" size={96} color="#ccc" />
      )}
      <View style={{ justifyContent: 'space-around' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>{renderRating(rating)}</View>
        <Text>{vicinity}</Text>
      </View>
    </View>
  );
};

const renderPriceLevel = (price_level) => {
  if (!price_level) return 'N/A';
  return '$'.repeat(price_level);
};

const RestaurantItem = ({ name, rating, price_level, vicinity, photoUrl }) => {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
      padding: 10,
    }}>
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }} />
      ) : (
        <Icon name="camera-outline" size={96} color="#ccc" />
      )}
      <View style={{ justifyContent: 'space-around' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>{renderRating(rating)}</View>
        <Text>Price Level: {renderPriceLevel(price_level)}</Text>
        <Text>{vicinity}</Text>
      </View>
    </View>
  );
};

export {RestaurantItem, PlaceItem};
