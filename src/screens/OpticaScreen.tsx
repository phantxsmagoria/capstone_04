import React, {useEffect, useState} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
{/* estos son las importaciones de los iconos */ }
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type RootStackParamList = {
  Usuario: undefined;
  Buscar: undefined;
  Carrito: undefined;
  Home: undefined;
  OpticaScreen: undefined;
  VerProducto: undefined;
  OpticaCobroPendiente: undefined;
  OpticaEnvioPendiente: undefined;
  OpticaEnviado: undefined;
  OpticaReseña: undefined;
  OpticaColaPedidos: undefined;
  OpticaNotificarError: undefined;
  OpticaConfiguracion: undefined;
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
        const q = query(collection(db, 'opticas'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setNombreOptica(userData.nombreOptica);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
  };

  return (
    <View>

      <View style={styles.nomProfile}>
        <FontAwesome5 name="user-circle" size={40} color="black" />
        <Text style={{ fontSize: 35 }}>{nombreOptica}</Text>
      </View>

      
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Text style={{
        padding: 20,
        fontSize: 25,
      }}>Mis Ventas</Text>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaCobroPendiente')}>
          <MaterialCommunityIcons name="credit-card-clock-outline" size={24} color="black" />
          <Text style={styles.textProfile}>Pendientes de cobro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaEnvioPendiente')}>
          <Feather name="package" size={24} color="black" />
          <Text style={styles.textProfile}>Pendientes de envío</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaEnviado')}>
          <Feather name="truck" size={24} color="black" />
          <Text style={styles.textProfile}>Enviados</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaReseña')}>
          <Feather name="edit" size={24} color="black" />
          <Text style={styles.textProfile}>Reseñas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaColaPedidos')}>
          <Ionicons name="bag-outline" size={24} color="black" />
          <Text style={styles.textProfile}>Pedidos en cola</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('VerProducto')}> 
          <FontAwesome5 name="glasses" size={24} color="black" />
          <Text style={styles.textProfile}>Mi catálogo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaNotificarError')}>
          <Feather name="alert-circle" size={24} color="black" />
          <Text style={styles.textProfile}>Notificar un error</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('OpticaConfiguracion')}>
          <Feather name="tool" size={24} color="black" />
          <Text style={styles.textProfile}>Configuración y soporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('Home')}>
          <Feather name="log-out" size={24} color="black" />
          <Text style={styles.textProfile}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
