// RegisterOptica.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

// Usa el mismo RootStackParamList que en App.tsx
type RootStackParamList = {
  Home: undefined;
  RegisterOpticaDocumento: undefined; // Asegúrate de incluir esto
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>; // Cambia el tipo según necesites
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Home'>; // Cambia el tipo según necesites

type Props = {
  navigation?: RegisterScreenNavigationProp;
  route?: RegisterScreenRouteProp;
};

export default function RegisterOptica({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('Home')}>
        <Icon name="times" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.titleRegisterCliente}>Registra</Text>
      <Text style={styles.pCliente}> Tu óptica </Text>
      <TextInput placeholder="Nombre de tu óptica" style={styles.inputLine} placeholderTextColor="#aaa" />
      <TextInput placeholder="Email" style={styles.inputLine} keyboardType="email-address" placeholderTextColor="#aaa" />
      <TextInput placeholder="Rol único tributario" style={styles.inputLine} placeholderTextColor="#aaa" />
      <TextInput placeholder="Dirección" style={styles.inputLine} placeholderTextColor="#aaa" />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.inputLine} placeholderTextColor="#aaa" />
      <TextInput placeholder="Confirmar contraseña" secureTextEntry style={styles.inputLine} placeholderTextColor="#aaa" />
      <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('RegisterOpticaDocumento')}>
        <Text style={styles.buttonText}>Registra tu óptica</Text>
      </TouchableOpacity>
    </View>
  );
}

