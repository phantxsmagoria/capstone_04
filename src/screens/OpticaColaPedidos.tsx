import { View, Text , TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList ={
  OpticaColaPedidos: undefined;
  OpticaScreen: undefined;
}

type OpticaColaPedidosScreenNavigationProp = StackNavigationProp<RootStackParamList,'OpticaColaPedidos'>;
type OpticaColaPedidosScreenRouterProp = RouteProp<RootStackParamList,'OpticaColaPedidos'>;
type Props = {navigation: OpticaColaPedidosScreenNavigationProp; route:OpticaColaPedidosScreenRouterProp};


export default function OpticaColaPedidos({navigation}: Props) {
  return (
    <View>
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" /> 
        <Text style={styles.tituloMenusOptica}>Pedidos en Cola</Text> 
      </TouchableOpacity>

      <View style={styles.imagenOpticaContainer}>
        <Image source={require('../assets/ColaPedido.png')} style={{width: 300, height: 300}}/>
        <Text style={styles.textoOptica}>Sin pedidos existentes</Text>
      </View>
    </View>
  )
}