import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
    ClienteConfiguracion: undefined;
    Perfil: undefined;
}

type ClienteConfiguracionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClienteConfiguracion'>;
type ClienteConfiguracionScreenRouteProp = RouteProp<RootStackParamList, 'ClienteConfiguracion'>;

type Props = {
    navigation: ClienteConfiguracionScreenNavigationProp;
    route: ClienteConfiguracionScreenRouteProp;
};


export default function ClienteConfiguracion({ navigation }: Props) {
    const Soport1 = () => {
        Alert.alert('¿Qué es Mis Pagos?', 'En Mis Pagos podrás revisar todos los pagos que has realizado dentro de la aplicación.', [
            {
                text: 'OK', onPress: () => console.log('OK Pressed')
            },
        ])
    };

    const Soport2 = () => {
        Alert.alert('¿Qué es Mis Boletas?', 'En Mis Boletas podrás encontrar a detalle todo lo que has comprado dentro de la aplicación.', [
            {
                text: 'OK', onPress: () => console.log('OK Pressed')
            },
        ])
    };

    const Soport3 = () => {
        Alert.alert('¿Qué es Mi Receta?', 'En Mi Receta podrás ingresar los datos de tu receta, para poder realizar las compras de tu lentes con tus medidas.', [
            {
                text: 'OK', onPress: () => console.log('OK Pressed')
            },
        ])
    };
    const Soport4 = () => {
        Alert.alert('¿Cómo puedo notificar un error?', 'Para poder notificar un error debes dirigirte a "Perfil", seleccionar "Notificar un error" y completar el formulario.', [
            {
                text: 'OK', onPress: () => console.log('OK Pressed')
            },
        ])
    };
    return (
        <View style={styles.fondoView}>
            <View>
                <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Perfil')}>
                    <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
                    <Text style={styles.tituloMenusOptica}>Configuración y Soporte</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={Soport1} style={styles.confi}>
                    <Text style={styles.confiTitle}>¿Qué es Mis Pagos?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Soport2} style={styles.confi}>
                    <Text style={styles.confiTitle}>¿Qué es Mis Boletas?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Soport3} style={styles.confi}>
                    <Text style={styles.confiTitle}>¿Qué es Mi Receta?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={Soport4} style={styles.confi}>
                    <Text style={styles.confiTitle}>¿Cómo puedo notificar un error?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}