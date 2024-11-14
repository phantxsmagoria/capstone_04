import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList ={
  OpticaReseña: undefined;
  OpticaScreen: undefined;
}

type OpticaReseñaScreenNavigationProp = StackNavigationProp<RootStackParamList,'OpticaReseña'>;
type OpticaReseñaScreenRouterProp = RouteProp<RootStackParamList,'OpticaReseña'>;
type Props = {navigation: OpticaReseñaScreenNavigationProp; route:OpticaReseñaScreenRouterProp};

export default function OpticaReseña({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" /> 
        <Text style={styles.tituloMenusOptica}>Reseñas</Text> 
      </TouchableOpacity>

      <View style={styles.imagenOpticaContainer}>
        <Image source={require('../assets/ReseñaOptica.png')} style={{width: 300, height: 300}}/>
        <Text style={styles.textoOptica}>No hay reseñas existentes</Text>
      </View>
    </View>
  )
}