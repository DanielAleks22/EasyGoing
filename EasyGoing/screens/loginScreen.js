import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Animated, StatusBar, TouchableOpacity, Dimensions, FlatList, Clipboard, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { auth, database } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { stylesLogin } from '../style/loginScreenStyle.js'; 


const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(true);

  const handleLogin = async () => {
    if (id === '' || password === '') {
        Alert.alert('Erreur', 'Entrer votre couriel et mot de passe');
        return;
    }

    try {
        let userCredential;
        if (isNewUser) {
            userCredential = await createUserWithEmailAndPassword(auth, id, password);
        } else {
            userCredential = await signInWithEmailAndPassword(auth, id, password);
        }
        console.log(userCredential);

        navigation.replace('Home');
        
    } catch (error) {
        Alert.alert('Erreur d\'authentification', error.message);
    }
};


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
 
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={stylesLogin.container}>
      <TextInput
        style={stylesLogin.input}
        placeholder="ID (email)"
        value={id}
        onChangeText={setId}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isNewUser ? 'Creer nouveau compte' : 'Login'} onPress={handleLogin} />
      <Button
        title={isNewUser ? 'Deja en possesion de compte? Login!' : 'Creer un nouveau compte'}
        onPress={() => setIsNewUser(!isNewUser)}
      />
    </View>
  );
};


export { LoginScreen };