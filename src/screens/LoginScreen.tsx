import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
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
        onFocus={() => setIsFocusedEmail(false)}
        onBlur={() => setIsFocusedEmail(false)}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        style={[styles.inputLine, isFocusedPassword && styles.inputLineFocus]}
        placeholderTextColor="#aaa"
        onFocus={() => setIsFocusedPassword(false)}
        onBlur={() => setIsFocusedPassword(false)}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('Home')}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}
