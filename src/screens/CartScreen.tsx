import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Carrito: undefined;
  Buscar: undefined;
  Usuario: undefined;
  Home: undefined;
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Carrito'>;
type CartScreenRouteProp = RouteProp<RootStackParamList, 'Carrito'>;

type Props = {
  navigation: CartScreenNavigationProp;
  route: CartScreenRouteProp;
};

export default function CartScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Carrito</Text>
      <Button
        title="Ir a Buscar"
        onPress={() => navigation.navigate('Buscar')}
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
