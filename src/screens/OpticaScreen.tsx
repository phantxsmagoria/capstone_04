import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type RootStackParamList = {
  Usuario: undefined;
  Carrito: undefined;
  Home: undefined;
  OpticaScreen: undefined;
  VerProducto: undefined;
  OpticaEnviado: undefined;
  OpticaReseña: undefined;
  OpticaConfiguracion: undefined;
  EditarPerfilOptica: undefined;
  OpticaNotificarError: undefined;
  CompartidoOptica: undefined;
};

type OpticaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpticaScreen'>;
type OpticaScreenRouteProp = RouteProp<RootStackParamList, 'OpticaScreen'>;

type Props = {
  navigation: OpticaScreenNavigationProp;
  route: OpticaScreenRouteProp;
};

export default function OpticaScreen({ navigation }: Props) {
  const [nombreOptica, setNombreOptica] = useState<string>('Optica');

  useEffect(() => {
    fetchNombreOptica();
  }, []);

  const fetchNombreOptica = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        console.log('Fetching data for user:', user.uid); // Añadir esta línea para depuración
        const q = query(collection(db, 'opticas'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log('User data:', userData); // Añadir esta línea para depuración
          setNombreOptica(userData.nombreOptica);
        } else {
          console.log('No data found for user:', user.uid); // Añadir esta línea para depuración
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    } else {
      console.log('No user is currently signed in.'); // Añadir esta línea para depuración
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      navigation.navigate('Home');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.fondoView}>
      <View style={[styles.nomProfile, {marginTop: 30,}]}>
        <FontAwesome5 name="user-circle" size={33} color="black" />
        <Text style={{ fontSize: 35 }}>{nombreOptica}</Text>
      </View>

      <View style={styles.containerOptica}>
        <Text style={{ padding: 20, fontSize: 25 }}>Mis ventas</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaEnviado')}>
            <Feather name="truck" size={24} color="black" />
            <Text style={styles.textProfile}>Enviados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaReseña')}>
            <Feather name="edit" size={24} color="black" />
            <Text style={styles.textProfile}>Reseñas</Text>
          </TouchableOpacity>          
        </View>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('VerProducto')}>
            <FontAwesome5 name="glasses" size={24} color="black" />
            <Text style={styles.textProfile}>Mi catálogo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('CompartidoOptica')}>
            <Feather name="share" size={24} color="black" />
            <Text style={styles.textProfile}>Compartidos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaNotificarError')}>
            <Feather name="alert-circle" size={24} color="black" />
            <Text style={styles.textProfile}>Notificar un error</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaConfiguracion')}>
            <Feather name="tool" size={24} color="black" />
            <Text style={styles.textProfile}>Configuración y soporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemProfile} onPress={handleLogout}>
            <Feather name="log-out" size={24} color="black" />
            <Text style={styles.textProfile}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
