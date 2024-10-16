import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  Register: undefined;
  RegisterCliente: undefined;
  RegisterOptica: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  route?: RegisterScreenRouteProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('Home')}>
      <Icon name="times" size={30} color="#000"/>
      </TouchableOpacity>

      <Text style={styles.titleRegister}>Regístrate</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterCliente')}>
        <Text style={styles.buttonText}>¿Cliente?</Text>
      </TouchableOpacity>
      <p> u </p>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterOptica')}>
        <Text style={styles.buttonText}>¿Óptica?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Ya tienes una cuenta? Inicia sesión.</Text>
      </TouchableOpacity>
    </View>
  );
}
