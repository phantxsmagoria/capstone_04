import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles';

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

export default function RegisterScreen({ navigation }: Props) {
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2000');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 95 }, (_, i) => (1930 + i).toString());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar Optica</Text>
      <TextInput placeholder="Nombre" style={styles.inputRegister} placeholderTextColor="#aaa" />
      <TextInput placeholder="Correo" style={styles.inputRegister} keyboardType="email-address" placeholderTextColor="#aaa" />
      <TextInput placeholder="RUT" style={styles.inputRegister} placeholderTextColor="#aaa" />
      <Text style={styles.labelFecha}>Fecha de Nacimiento</Text>
      <View style={styles.datePickerContainer}>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {days.map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {months.map((month) => (
            <Picker.Item key={month} label={month} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {years.map((year) => (
            <Picker.Item key={year} label={year} value={year} />
          ))}
        </Picker>
      </View>
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.inputRegister} placeholderTextColor="#aaa" />
      <TextInput placeholder="Confirmar contraseña" secureTextEntry style={styles.inputRegister} placeholderTextColor="#aaa" />
      <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('Home')}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

