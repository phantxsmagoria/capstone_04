import { View, Text , TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';


type RootStackParamList ={
    ClienteRegistroBoletas: undefined;
    Perfil: undefined;
  }
  
  type ClienteRegistroBoletasScreenNavigationProp = StackNavigationProp<RootStackParamList,'ClienteRegistroBoletas'>;
  type ClienteRegistroBoletasScreenRouterProp = RouteProp<RootStackParamList,'ClienteRegistroBoletas'>;
  type Props = {navigation: ClienteRegistroBoletasScreenNavigationProp; route:ClienteRegistroBoletasScreenRouterProp};
  
  

export default function ClienteRegistroBoletas({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" /> 
        <Text style={styles.tituloMenusOptica}>Mis Boletas</Text> 
      </TouchableOpacity>

      <View style={styles.imagenOpticaContainer}>
        <Image source={require('../assets/ClienteBoleta.png')} style={{width: 300, height: 300}}/>
        <Text style={styles.textoOptica}>Sin boletas existentes</Text>
      </View>
    </View>
  )
}