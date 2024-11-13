import { View, Text, TouchableOpacity } from 'react-native'
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
        <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> 
        <Text style={{ fontSize: 30 }}>Pendientes de Cobro</Text> 
      </TouchableOpacity>
    </View>
  )
}