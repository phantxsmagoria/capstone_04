import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import styles from '../styles/styles';

type RootStackParamList = {
  ClienteRegistroBoletas: undefined;
  Perfil: undefined;
};

type ClienteRegistroBoletasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClienteRegistroBoletas'>;
type ClienteRegistroBoletasScreenRouterProp = RouteProp<RootStackParamList, 'ClienteRegistroBoletas'>;
type Props = {
  navigation: ClienteRegistroBoletasScreenNavigationProp;
  route: ClienteRegistroBoletasScreenRouterProp;
};

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
  cartItems: CartItem[];
};

type Optica = {
  nombreOptica: string;
  rut: string;
  productos: CartItem[];
};

export default function ClienteRegistroBoletas({ navigation }: Props) {
  const [boletas, setBoletas] = useState<BoletaCliente[]>([]);
  const [loading, setLoading] = useState(true);

  const [contador, setContador] = useState<number>(0);

  useEffect(() => {
    setContador(contador + 2 ); 
    }, []);
 

  useEffect(() => {
    const fetchBoletas = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const boletasQuery = query(collection(db, 'boletacliente'), where('uid', '==', user.uid));
          const boletasSnapshot = await getDocs(boletasQuery);
          const boletaList: BoletaCliente[] = boletasSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              address: data.address,
              comuna: data.comuna,
              ciudad: data.ciudad,
              totalPrice: data.totalPrice,
              cartItems: data.cartItems.map((item: any) => ({
                productoId: item.productoId,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
                imagenURL: item.imagenURL,
                categoria: item.categoria,
                quantity: item.quantity,
                nombreOptica: item.nombreOptica,
                rut: item.rut,
                cantidadLlevada: item.cantidadLlevada
              }))
            };
          });

          setBoletas(boletaList);
        }
      } catch (error) {
        console.error('Error fetching boletas: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoletas();
  }, []);

  if (loading) {
    return (
      <View style={styles.imagenOpticaContainer}>
        <Text style={styles.textoOptica}>Cargando boletas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.fondoView}>
      <TouchableOpacity style={[styles.nomProfile, {marginTop:30,}]} onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" />
        <Text style={[styles.tituloMenusOptica]}>Mis Boletas</Text>
      </TouchableOpacity>

      {boletas.length === 0 ? (
        <View style={styles.imagenOpticaContainer}>
          <Image source={require('../assets/ClienteBoleta.png')} style={{ width: 300, height: 300 }} />
          <Text style={styles.textoOptica}>Sin boletas existentes</Text>
        </View>
      ) : (
        <FlatList
          style={{
            height: 850,
          }}
          data={boletas}
          renderItem={({ item }) => {
            const opticaMap = new Map<string, Optica>();
            item.cartItems.forEach(cartItem => {
              const key = `${cartItem.nombreOptica}-${cartItem.rut}`;
              if (!opticaMap.has(key)) {
                opticaMap.set(key, {
                  nombreOptica: cartItem.nombreOptica,
                  rut: cartItem.rut,
                  productos: []
                });
              }
              opticaMap.get(key)!.productos.push(cartItem);
            });

            return (
              <View style={styles.boletaContainer}>
                <Text style={styles.boletaTitle}>N° Boleta: {contador}</Text>
                <Text>Nombre: {item.name}</Text>
                <Text>Dirección: {item.address}</Text>
                <Text>Comuna: {item.comuna}</Text>
                <Text>Ciudad: {item.ciudad}</Text>
                {[...opticaMap.values()].map((optica, opticaIndex) => (
                  <View key={`optica-${opticaIndex}`}>
                    <Text>Óptica: {optica.nombreOptica}</Text>
                    <Text>RUT Óptica: {optica.rut}</Text>
                    {optica.productos.map((producto, prodIndex) => (
                      <View key={`producto-${opticaIndex}-${prodIndex}`}>
                        <Text>Producto: {producto.nombre} ${producto.precio}</Text>
                        <Text>Cantidad: {producto.cantidadLlevada}</Text>
                      </View>
                    ))}
                    <Text>Total: ${item.totalPrice}</Text>
                  </View>
                ))}
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}