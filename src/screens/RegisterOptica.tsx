import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

type RootStackParamList = { Home: undefined; RegisterOpticaDocumento: undefined; };
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type Props = { navigation?: RegisterScreenNavigationProp; route?: RegisterScreenRouteProp; };

export default function RegisterOptica({ navigation }: Props) {
    const [nombreOptica, setNombreOptica] = useState('');
    const [email, setEmail] = useState('');
    const [rut, setRut] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contraseña, setPassword] = useState('');
    const [confirmContraseña, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = async (email: string) => {
        const userQuery = query(collection(db, 'opticas'), where('email', '==', email));
        const querySnapshot = await getDocs(userQuery);
        return querySnapshot.empty;
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[._*])[A-Za-z\d._*]{12,}$/;
        return regex.test(password);
    };

    const validateRUT = (rut: string) => {
      // Eliminar puntos y guión
      const cleanedRUT = rut.replace(/[.\-]/g, '');
      
      // Validar que el RUT tenga entre 8 y 9 caracteres
      const rutRegex = /^[0-9]{7,8}[0-9kK]$/;
      if (!rutRegex.test(cleanedRUT)) return false;
      
      const [number, verifier] = [cleanedRUT.slice(0, -1), cleanedRUT.slice(-1)];
      let sum = 0;
      let multiplier = 2;
      for (let i = number.length - 1; i >= 0; i--) {
          sum += parseInt(number[i], 10) * multiplier;
          multiplier = (multiplier === 7) ? 2 : multiplier + 1;
      }
      const calculatedVerifier = 11 - (sum % 11);
      const verifierDigit = (calculatedVerifier === 11) ? '0' : (calculatedVerifier === 10) ? 'k' : calculatedVerifier.toString();
      return verifier.toLowerCase() === verifierDigit;
  };
  

    const handleRegister = async () => {
        setErrorMessage(''); // Resetear mensaje de error
        if (contraseña !== confirmContraseña) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }
        if (!validatePassword(contraseña)) {
            setErrorMessage('La contraseña debe tener al menos 12 caracteres, una mayúscula, un número y un símbolo (un asterisco, un guión bajo o un punto).');
            return;
        }
        const emailAvailable = await validateEmail(email);
        if (!emailAvailable) {
            setErrorMessage('El correo electrónico ya está registrado.');
            return;
        }
        if (!validateRUT(rut)) {
            setErrorMessage('El RUT no es válido.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
            await addDoc(collection(db, 'opticas'), {
                uid: userCredential.user.uid,
                nombreOptica,
                email,
                rut,
                direccion,
                type: 'optica',  // Añadimos el tipo de usuario
            });
            alert('Éxito Registro completado.');
            navigation?.navigate('RegisterOpticaDocumento');
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al registrar: ', error.message);
                setErrorMessage(`Error al registrar: ${error.message}`);
            } else {
                console.error('Error con registrar: ', error);
                setErrorMessage('Error desconocido al registrar.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('Home')}>
                <Icon name="times" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.titleRegisterCliente}>Registra</Text>
            <Text style={styles.pCliente}> Tu óptica </Text>
            <TextInput
                placeholder="Nombre de tu óptica"
                style={styles.inputLine}
                placeholderTextColor="#aaa"
                value={nombreOptica}
                onChangeText={setNombreOptica}
            />
            <TextInput
                placeholder="Email"
                style={styles.inputLine}
                keyboardType="email-address"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Rol único tributario"
                style={styles.inputLine}
                placeholderTextColor="#aaa"
                value={rut}
                onChangeText={setRut}
            />
            <TextInput
                placeholder="Dirección"
                style={styles.inputLine}
                placeholderTextColor="#aaa"
                value={direccion}
                onChangeText={setDireccion}
            />
            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                style={styles.inputLine}
                placeholderTextColor="#aaa"
                value={contraseña}
                onChangeText={setPassword}
            />
            <TextInput
                placeholder="Confirmar contraseña"
                secureTextEntry
                style={styles.inputLine}
                placeholderTextColor="#aaa"
                value={confirmContraseña}
                onChangeText={setConfirmPassword}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registra tu óptica</Text>
            </TouchableOpacity>
        </View>
    );
}
