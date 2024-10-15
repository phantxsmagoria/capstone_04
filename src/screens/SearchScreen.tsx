import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles'

type RootStackParamList = {
  Buscar: undefined;
  Carrito: undefined;
  Usuario: undefined;
  Home: undefined;
};

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Buscar'>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Buscar'>;

type Props = {
  navigation: SearchScreenNavigationProp;
  route: SearchScreenRouteProp;
};

export default function SearchScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Buscar</Text>
      <Button
        title="Ir al Carrito"
        onPress={() => navigation.navigate('Carrito')}
      />
      <Button
        title="Ir al Usuario"
        onPress={() => navigation.navigate('Usuario')}
      />
      <Button
        title="Ir al Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
