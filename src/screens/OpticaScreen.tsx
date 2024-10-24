import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';

type RootStackParamList = {
  Usuario: undefined;
  Buscar: undefined;
  Carrito: undefined;
  Home: undefined;
  OpticaScreen: undefined;
};

type OpticaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpticaScreen'>;
type OpticaScreenRouteProp = RouteProp<RootStackParamList, 'OpticaScreen'>;

type Props = {
  navigation: OpticaScreenNavigationProp;
  route: OpticaScreenRouteProp;
};

export default function OpticaScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bienvenido a la pantalla de Óptica</Text>
      <Button
        title="Ir a Buscar"
        onPress={() => navigation.navigate('Buscar')}
      />
      <Button
        title="Ir a Catálogo"
        onPress={() => navigation.navigate('Carrito')}
      />
      <Button
        title="Ir al Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
