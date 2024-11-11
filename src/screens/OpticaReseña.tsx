import { View, Text, TouchableOpacity } from 'react-native'
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
        <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> {/* acá modifique el tamaño por 35*/}
        <Text style={{ fontSize: 30 }}>Reseñas</Text> {/* acá modifique el tamaño por 30*/}
      </TouchableOpacity>
    </View>
  )
}