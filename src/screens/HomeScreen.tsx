import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
  Registro: undefined;
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.buttonContainer}>
      
      <TouchableOpacity style={styles.loginButtonWrapper} onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.loginButtonText, {backgroundColor: '#ff5722',}]}>Inicia sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButtonWrapper} onPress={() => navigation.navigate('Registro')}>
        <Text style={[styles.registerButtonText, {backgroundColor: '#fff'}]}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}
