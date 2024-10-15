import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles'

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
  return (
    <View style={styles.container}>
      <p>Registro</p>
      <br />
      <TextInput placeholder="Nombre de usuario" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
      <Button
        title="Registrarse"
        onPress={() => navigation?.navigate('Home')}
      />
    </View>
  );
}

