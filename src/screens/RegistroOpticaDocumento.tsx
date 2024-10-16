import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  RegisterOpticaDocumento: undefined;
  Home: undefined;
  RegisterOptica: undefined;
};

type RegisterOpticaDocumentoNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterOpticaDocumento'>;
type RegisterOpticaDocumentoRouteProp = RouteProp<RootStackParamList, 'RegisterOpticaDocumento'>;

type Props = {
  navigation: RegisterOpticaDocumentoNavigationProp;
  route: RegisterOpticaDocumentoRouteProp;
};

export default function RegistroOpticaDocumento({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.closeButton} onPress={() => navigation?.navigate('RegisterOptica')}>
    <Icon name="times" size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.titleRegisterCliente}>Registra</Text>
      <Text style={styles.pCliente}> Tu óptica </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('RegisterOpticaDocumento')}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
