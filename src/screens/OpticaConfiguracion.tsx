import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList ={
  OpticaConfiguracion: undefined;
  OpticaScreen: undefined;
}

type OpticaConfiguracionScreenNavigationProp = StackNavigationProp<RootStackParamList,'OpticaConfiguracion'>;
type OpticaConfiguracionScreenRouterProp = RouteProp<RootStackParamList,'OpticaConfiguracion'>;
type Props = {navigation: OpticaConfiguracionScreenNavigationProp; route:OpticaConfiguracionScreenRouterProp};

export default function OpticaConfiguracion({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> 
        <Text style={{ fontSize: 30 }}>Configuración y Soporte</Text> 
      </TouchableOpacity>
    </View>
  )
}