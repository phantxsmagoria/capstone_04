import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Usuario: undefined;
  Buscar: undefined;
  Carrito: undefined;
  Home: undefined;
};

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Usuario'>;
type UserScreenRouteProp = RouteProp<RootStackParamList, 'Usuario'>;

type Props = {
  navigation: UserScreenNavigationProp;
  route: UserScreenRouteProp;
};

export default function UserScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Button
        title="Ir a Buscar"
        onPress={() => navigation.navigate('Buscar')}
      />
      <Button
        title="Ir al Carrito"
        onPress={() => navigation.navigate('Carrito')}
      />
      <Button
        title="Ir al Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
