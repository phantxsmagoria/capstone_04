import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import styles from '../styles/styles';

type RootStackParamList = {
  OpticaEnviado: undefined;
  OpticaScreen: undefined;
};

type OpticaEnviadoScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpticaEnviado'>;
type OpticaEnviadoScreenRouterProp = RouteProp<RootStackParamList, 'OpticaEnviado'>;
type Props = { navigation: OpticaEnviadoScreenNavigationProp; route: OpticaEnviadoScreenRouterProp };

type CartItem = {
  productoId: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
  quantity: number;
  nombreOptica: string;
  rut: string;
  cantidadLlevada: number;
};

type BoletaCliente = {
  id: string;
  name: string;
  address: string;
  comuna: string;
  ciudad: string;
  totalPrice: number;
  boletaNumero: number;
  cartItems: CartItem[];
};

export default function OpticaEnviado({ navigation }: Props) {
  const [boletas, setBoletas] = useState<BoletaCliente[]>([]);
  const [cargandoBoletas, setCargandoBoletas] = useState(true);

  const fetchBoletas = async () => {
    try {
      const boletasSnapshot = await getDocs(collection(db, 'boletacliente'));
      console.log('QuerySnapshot Size:', boletasSnapshot.size);
  
      if (!boletasSnapshot.empty) {
        const boletaList: BoletaCliente[] = [];
        for (const docSnap of boletasSnapshot.docs) {
          const data = docSnap.data();
          console.log('Datos de la Boleta:', data);
          boletaList.push({
            id: docSnap.id,
            ...data,
          } as BoletaCliente);
        }
        console.log('Boletas List:', boletaList);
        setBoletas(boletaList);
      } else {
        console.log('No se encontraron boletas.');
      }
    } catch (error) {
      console.error('Error fetching boletas: ', error);
    } finally {
      setCargandoBoletas(false);
    }
  };
  

  useEffect(() => {
    fetchBoletas();
  }, []);

  const onRefresh = async () => {
    setCargandoBoletas(true);
    await fetchBoletas();
    setCargandoBoletas(false);
  };

  const renderBoleta = ({ item }: { item: BoletaCliente }) => (
    <View style={styles.boletaContainer}>
      <Text>N° Boleta: {item.boletaNumero}</Text>
      <Text>Nombre: {item.name}</Text>
      <Text>Dirección: {item.address}</Text>
      <Text>Comuna: {item.comuna}</Text>
      <Text>Ciudad: {item.ciudad}</Text>
      <Text>Total: ${item.totalPrice}</Text>
      {item.cartItems.map((producto, index) => (
        <View key={index}>
          <Text>Producto: {producto.nombre} ${producto.precio}</Text>
          <Text>Cantidad: {producto.cantidadLlevada}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" />
        <Text style={styles.tituloMenusOptica}>Enviados</Text>
      </TouchableOpacity>

      {boletas.length === 0 ? (
        <View style={styles.imagenOpticaContainer}>
          <Image source={require('../assets/Enviado.png')} style={{ width: 300, height: 300 }} />
          <Text style={styles.textoOptica}>No tienes pedidos enviados existentes</Text>
        </View>
      ) : (
        <FlatList
          data={boletas}
          style={{
            height: 850,
          }}
          renderItem={renderBoleta}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={cargandoBoletas} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
