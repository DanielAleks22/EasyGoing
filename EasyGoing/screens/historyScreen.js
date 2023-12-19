import React, { useState, useEffect } from 'react';
import { Animated, View, TouchableOpacity, Text, FlatList, Clipboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import { styles } from '../style/historyScreenStyle.js';

function HistoryScreen() {
    const [userHistory, setUserHistory] = useState([]);
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const navigation = useNavigation();

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        alert('Adresse copiée !');
    };

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    
        const userId = auth.currentUser.uid;
    
        const historyRef = ref(database, 'users/' + userId + '/history');
    
        const unsubscribe = onValue(historyRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setUserHistory(Object.values(data));
            }
        });
    
        return () => {
            unsubscribe();
            off(historyRef);
        };
    }, []);
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.animatedView, { opacity: opacity }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()} 
                    style={styles.backButton}
                >
                    <Icon name="arrow-circle-left" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Adresses recherchées</Text>
                <FlatList
                    data={userHistory}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() => copyToClipboard(item)}
                        >
                            <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </Animated.View>
        </View>
    );
}



export { HistoryScreen };
