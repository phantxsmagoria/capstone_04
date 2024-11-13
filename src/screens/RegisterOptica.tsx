import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

type RootStackParamList = { 
  Home: { showPopup?: boolean }; // Aquí he actualizado el tipo
  RegisterOpticaDocumento: undefined; 
};
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
    const [successMessage, setSuccessMessage] = useState('');

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
        const cleanedRUT = rut.replace(/[.\-]/g, '');
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
        setSuccessMessage(''); // Resetear mensaje de éxito

        if (contraseña !== confirmContraseña) {
            setErrorMessage('Las contraseñas no coinciden.');
            return;
        }

        if (!validatePassword(contraseña)) {
            setErrorMessage('La contraseña debe tener al menos 12 caracteres, de los cuales debe tener un número, una mayúscula y un símbolo ( .,_/ )');
            return;
        }

        const emailAvailable = await validateEmail(email);
        if (!emailAvailable) {
            setErrorMessage('El correo electrónico ya está registrado.');
            return;
        }

        if (!validateRUT(rut)) {
            setErrorMessage('El RUT no es válido, ingresa el rut sin puntos y guión.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, contraseña);
            await addDoc(collection(db, 'opticas'), {
                uid: userCredential.user.uid, // código de registro que se le asigna al usuario cuando se registra, guardado en firebase. 
                nombreOptica,
                email,
                rut,
                direccion,
                type: 'optica',  // Esto es para que las tablas no se mezclen y haga la separación de credenciales correspondiente!!!! No borrar!!!
            });
            setSuccessMessage('Registro completado exitosamente.');
            navigation?.navigate({
                name: 'Home', 
                params: { showPopup: true },
                merge: true,
            });  // Navegar a Home y mostrar el popup
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
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate({
                name: 'Home',
                params: { showPopup: false },
                merge: true,
            })}>
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
            {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registra tu óptica</Text>
            </TouchableOpacity>
        </View>
    );
}
