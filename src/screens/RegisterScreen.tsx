import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Register: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;
type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

type Props = {
  navigation?: RegisterScreenNavigationProp;
  route?: RegisterScreenRouteProp;
};

export default function RegisterScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <p>Registro</p>
      <br />
      <TextInput placeholder="Nombre de usuario" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
      <Button
        title="Registrarse"
        onPress={() => navigation?.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
