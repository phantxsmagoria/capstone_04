import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../firebaseConfig'; // Importa auth y db desde firebaseConfig
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

type RootStackParamList = {
  Register: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  navigation?: RegisterScreenNavigationProp;
  route?: RegisterScreenRouteProp;
};

const RegisterCliente: React.FC<Props> = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 95 }, (_, i) => (1930 + i).toString());

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        name,
        email,
        rut,
        birthdate: `${selectedYear}-${selectedMonth}-${selectedDay}`
      });
      alert('Registro exitoso');
      navigation?.navigate('Home');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al registrar: ', error.message); // Muestra el mensaje del error específico
        alert(`Error al registrar: ${error.message}`);
      } else {
        console.error('Error al registrar: ', error);
        alert('Error desconocido al registrar');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('Home')}>
        <Icon name="times" size={30} color="#000"/>
      </TouchableOpacity>
      <Text style={styles.titleRegisterClienteNatural}>Regístrate</Text>
      <Text style={styles.pClienteNatural}>Como cliente</Text>
      <TextInput
        placeholder="Nombre"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Correo"
        style={styles.inputLine}
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="RUT"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={rut}
        onChangeText={setRut}
      />
      <Text style={styles.labelFecha}>Fecha de Nacimiento</Text>
      <View style={styles.datePickerContainer}>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={itemValue => setSelectedDay(itemValue)}
        >
          {days.map(day => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={itemValue => setSelectedMonth(itemValue)}
        >
          {months.map(month => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={itemValue => setSelectedYear(itemValue)}
        >
          {years.map(year => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirmar contraseña"
        secureTextEntry
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterCliente;

