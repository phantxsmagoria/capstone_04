import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
    Login: undefined;
    OlvidarContraseña: undefined;
    Home: undefined;
};

type OlvidarContraseñaNavigationProp = StackNavigationProp<RootStackParamList, 'OlvidarContraseña'>;
type OlvidarContraseñaRouteProp = RouteProp<RootStackParamList, 'OlvidarContraseña'>;

type Props = {
    navigation?: OlvidarContraseñaNavigationProp;
    route?: OlvidarContraseñaRouteProp;
};

export default function OlvidarContraseña({navigation}: Props) {
    const [email, setEmail] = useState('');

    const handelOlvideContra = async () => {
        if (!email) {
            alert('Por favor, ingresa tu email.');
            return;
        }
        try {
            // este es para verficar que el email de usuario exista
            const userQuery = query(collection(db, 'users'), where('email', '==', email));
            const userQuerySnapshot = await getDocs(userQuery);
            
            // este es para verificar que el email de optica exista
            const opticaQuery = query(collection(db, 'opticas'), where('email', '==', email));
            const opticaQuerySnapshot = await getDocs(opticaQuery);
            
            if (userQuerySnapshot.empty) {
                Alert.alert('Error', 'No existe un usuario con ese correo electrónico');
                return;
            }
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Se ha enviado un correo para restabler tu contraseña', 'Por favor, revisa tu bandeja de entrada')
        } catch (error) {
            console.error('Hemos tenido un error al enviar el correo para reestablecer tu contraseña: ', error);
            alert('Error al enviar correo de restablecimento de contraseña')
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('Home')}>
                <Icon name="times" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.titleLogin}>¿Olvidaste tu contraseña?</Text>
            <TextInput placeholder="Email" style={styles.inputLine} placeholderTextColor="#aaa" value={email} onChangeText={setEmail} />
            <TouchableOpacity style={styles.button} onPress={handelOlvideContra}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </View>
    )
}