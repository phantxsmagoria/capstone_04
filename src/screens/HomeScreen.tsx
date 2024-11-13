import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  MainTabs: undefined;
  OpticaScreen: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export default function HomeScreen({ navigation }: Props) {
  return (
          <View style={styles.overlay}>
            <Image source={require('../assets/LOGO.png')} style={styles.logo} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loginButtonWrapper}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginButtonText}>Inicia sesión</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.registerButtonWrapper}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.registerButtonText}>Regístrate</Text>
              </TouchableOpacity>
            </View>
          </View>
  );
}
