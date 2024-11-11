import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList ={
  OpticaEnviado: undefined;
  OpticaScreen: undefined;
}

type OpticaEnviadoScreenNavigationProp = StackNavigationProp<RootStackParamList,'OpticaEnviado'>;
type OpticaEnviadoScreenRouterProp = RouteProp<RootStackParamList,'OpticaEnviado'>;
type Props = {navigation: OpticaEnviadoScreenNavigationProp; route:OpticaEnviadoScreenRouterProp};

export default function OpticaEnviado({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> {/* acá modifique el tamaño por 35*/}
        <Text style={{ fontSize: 30 }}>Enviados</Text> {/* acá modifique el tamaño por 30*/}
      </TouchableOpacity>
    </View>
  )
}