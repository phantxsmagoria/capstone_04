import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList = {
  OpticaConfiguracion: undefined;
  OpticaScreen: undefined;
}

type OpticaConfiguracionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpticaConfiguracion'>;
type OpticaConfiguracionScreenRouterProp = RouteProp<RootStackParamList, 'OpticaConfiguracion'>;
type Props = { navigation: OpticaConfiguracionScreenNavigationProp; route: OpticaConfiguracionScreenRouterProp };

export default function OpticaConfiguracion({ navigation }: Props) {
  const Soport1 = () => {
    Alert.alert('¿Qué es Pendientes de cobro?', 'En Pendientes de cobro podrás revisar todos cobros pendientes existentes.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };

  const Soport2 = () => {
    Alert.alert('¿Qué es Pendientes de envío?', 'En Pendientes de envío podrás revisar todos los envios pendientes existentes.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };

  const Soport3 = () => {
    Alert.alert('¿Qué es Enviados?', 'En Enviados podrás revisar todos los productos que han sido enviados.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };
  const Soport4 = () => {
    Alert.alert('¿Qué es Reseñas?', 'En Reseñas podrás ver todas las reseñas sobre tus productos.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };
  const Soport5 = () => {
    Alert.alert('¿Qué es Pedidos en cola?', 'En Pedidos en cola podrás revisar todos los Pedidos pendientes existentes.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };
  const Soport6 = () => {
    Alert.alert('¿Qué es Mi Catálogo?', 'En Mi Catálogo podrás revisar todos los productos que has publicado, además de poder añadir más productos o en su defecto eliminar productos.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };
  const Soport7 = () => {
    Alert.alert('¿Cómo puedo notificar un error?', 'Para poder notificar un error debes seleccionar "Notificar un error" y completar el formulario.', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };
  return (
    <View style={styles.fondoView}>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
          <Text style={styles.tituloMenusOptica}>Configuración y Soporte</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={Soport1} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Qué es Pendientes de cobro?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Soport2} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Qué es Pendientes de envío?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Soport3} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Qué es Enviados?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Soport4} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Qué es Reseñas?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Soport5} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Qué es Pedidos en cola?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Soport6} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Qué es Mi Catálogo?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Soport7} style={styles.confi}>
          <Text style={styles.confiTitle}>¿Cómo puedo notificar un error?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}