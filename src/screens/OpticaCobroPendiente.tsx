import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList ={
  OpticaCobroPendiente: undefined;
  OpticaScreen: undefined;
}

type OpticaCobroPendienteScreenNavigationProp = StackNavigationProp<RootStackParamList,'OpticaCobroPendiente'>;
type OpticaCobroPendienteScreenRouterProp = RouteProp<RootStackParamList,'OpticaCobroPendiente'>;
type Props = {navigation: OpticaCobroPendienteScreenNavigationProp; route:OpticaCobroPendienteScreenRouterProp};

export default function OpticaCobroPendiente({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" /> 
        <Text style={styles.tituloMenusOptica}>Pendientes de Cobro</Text> 
      </TouchableOpacity>

      <View style={styles.imagenOpticaContainer}>
        <Image source={require('../assets/PagoPendiente.png')} style={{width: 300, height: 300}}/>
        <Text style={styles.textoOptica}>No hay pendientes de cobro existentes</Text>
      </View>
    </View>
  )
}