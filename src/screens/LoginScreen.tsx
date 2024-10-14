import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;

type Props = {
  navigation?: LoginScreenNavigationProp;
  route?: LoginScreenRouteProp;
};

export default function LoginScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="Nombre de usuario" style={styles.input} />
      <TextInput placeholder="Contraseña" secureTextEntry style={styles.input} />
      <Button
        title="Iniciar sesión"
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
