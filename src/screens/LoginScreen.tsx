import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';
import { auth, db } from '../firebaseConfig'; // Importa db además de auth desde firebaseConfig
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

type RootStackParamList = { 
    Login: undefined; 
    Home: undefined; 
    Usuario: undefined; 
    OpticaScreen: undefined; // Añadir OpticaScreen a las rutas
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = { 
    navigation?: LoginScreenNavigationProp; 
    route?: LoginScreenRouteProp;
};

export default function LoginScreen({ navigation }: Props) {
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Verificar si es un usuario natural
            const userQuery = query(collection(db, 'users'), where('uid', '==', userCredential.user.uid));
            const userQuerySnapshot = await getDocs(userQuery);
            
            if (!userQuerySnapshot.empty) {
                const userData = userQuerySnapshot.docs[0].data();
                if (userData.type === 'cliente') {
                    navigation?.navigate('Usuario'); // Redirigir a UserScreen
                    return;
                }
            }

            // Verificar credenciales 
            const opticaQuery = query(collection(db, 'opticas'), where('uid', '==', userCredential.user.uid));
            const opticaQuerySnapshot = await getDocs(opticaQuery);

            if (!opticaQuerySnapshot.empty) {
                const opticaData = opticaQuerySnapshot.docs[0].data();
                if (opticaData.type === 'optica') {
                    navigation?.navigate('OpticaScreen');  // Redirigir a Usuario si no es credencial de óptica.
                } else {
                    navigation?.navigate('Usuario');  // Redirigir a Usuario si no es credencial de óptica.
                }
            } else {
                navigation?.navigate('Usuario');  // Redirigir a Usuario si no es credencial de óptica.
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al iniciar sesión: ', error.message);
                alert(`Error al iniciar sesión: ${error.message}`);
            } else {
                console.error('Error al iniciar sesión: ', error);
                alert('Error desconocido al iniciar sesión');
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('Home')}>
                <Icon name="times" size={30} color="#000"/>
            </TouchableOpacity>
            <Text style={styles.titleLogin}>Inicia sesión</Text>
            <TextInput
                placeholder="Email"
                style={[styles.inputLine, isFocusedEmail && styles.inputLineFocus, styles.separator]}
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
            />
            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                style={[styles.inputLine, isFocusedPassword && styles.inputLineFocus]}
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsFocusedPassword(true)}
                onBlur={() => setIsFocusedPassword(false)}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </View>
    );
}
