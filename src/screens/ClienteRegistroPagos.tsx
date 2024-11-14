import { View, Text , TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';


type RootStackParamList ={
    ClienteRegistroPagos: undefined;
    Perfil: undefined;
  }
  
  type ClienteRegistroPagosScreenNavigationProp = StackNavigationProp<RootStackParamList,'ClienteRegistroPagos'>;
  type ClienteRegistroPagosScreenRouterProp = RouteProp<RootStackParamList,'ClienteRegistroPagos'>;
  type Props = {navigation: ClienteRegistroPagosScreenNavigationProp; route:ClienteRegistroPagosScreenRouterProp};
  
  

export default function ClienteRegistroPagos({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" /> 
        <Text style={styles.tituloMenusOptica}>Mis Pagos</Text> 
      </TouchableOpacity>

      <View style={styles.imagenOpticaContainer}>
        <Image source={require('../assets/ClientePago.png')} style={{width: 300, height: 300}}/>
        <Text style={styles.textoOptica}>Sin pagos existentes</Text>
      </View>
    </View>
  )
}