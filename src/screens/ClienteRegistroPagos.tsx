import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import styles2 from '../styles/styles2';

type RootStackParamList = {
  ClienteRegistroPagos: undefined;
  Perfil: undefined;
  AgregarReseñaScreen: { productId: string };
};

type ClienteRegistroPagosScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClienteRegistroPagos'>;
type ClienteRegistroPagosScreenRouterProp = RouteProp<RootStackParamList, 'ClienteRegistroPagos'>;
type Props = { navigation: ClienteRegistroPagosScreenNavigationProp; route: ClienteRegistroPagosScreenRouterProp };

interface ProductoData {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
  cantidadComprada: number; // Añadimos 'cantidadComprada'
}

export default function ClienteRegistroPagos({ navigation }: Props) {
  const [purchasedProducts, setPurchasedProducts] = useState<ProductoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  const fetchPurchasedProducts = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(collection(db, 'boletacliente'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      const purchasedProductsMap: Record<string, number> = {};

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Data from boletacliente:", data);
        if (data.cartItems) {
          data.cartItems.forEach((item: { productoId: string, cantidadLlevada: number }) => {
            if (purchasedProductsMap[item.productoId]) {
              purchasedProductsMap[item.productoId] += item.cantidadLlevada;
            } else {
              purchasedProductsMap[item.productoId] = item.cantidadLlevada;
            }
          });
        }
      });

      const productIds = Object.keys(purchasedProductsMap);
      if (productIds.length > 0) {
        // Dividir en lotes si hay más de 10 IDs
        const batches = [];
        while (productIds.length) {
          batches.push(productIds.splice(0, 10));
        }

        const productos: ProductoData[] = [];
        for (const batch of batches) {
          const productosSnapshot = await getDocs(query(collection(db, 'productos'), where('__name__', 'in', batch)));
          productosSnapshot.forEach((doc) => {
            const data = doc.data();
            productos.push({ 
              id: doc.id, 
              nombre: data.nombre,
              descripcion: data.descripcion,
              precio: data.precio,
              imagenURL: data.imagenURL,
              categoria: data.categoria,
              cantidadComprada: purchasedProductsMap[doc.id] // Añadimos la cantidad comprada
            } as ProductoData);
          });
        }

        setPurchasedProducts(productos);
        console.log("Purchased products data:", productos);
      }
    } catch (error) {
      console.error("Error fetching purchased products:", error);
      
    }finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: ProductoData }) => (
    <View style={styles.productoContainer}>
      <Image
        source={{ uri: item.imagenURL }}
        style={styles2.productImage}
      />
      <Text style={styles.productTitle}>{item.nombre}</Text>
      <Text>{item.categoria}</Text>
      <Text style={styles.productPrice}>${item.precio}</Text>
      <Text style={styles.productPrice}>Cantidad comprada: {item.cantidadComprada}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AgregarReseñaScreen', { productId: item.id })}
      >
        <Text style={styles.buttonText}>Agregar Reseña</Text>
      </TouchableOpacity>
    </View>
  );
  
  if (loading) {
    return (
      <View style={styles.imagenOpticaContainer}>
        <Text style={styles.textoOptica}>Cargando Pagos...</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" />
        <Text style={styles.tituloMenusOptica}>Mis Pagos</Text>
      </TouchableOpacity>

      {purchasedProducts.length === 0 ? (
        <View style={styles.imagenOpticaContainer}>
          <Image source={require('../assets/ClientePago.png')} style={{width: 300, height: 300}}/>
          <Text style={styles.textoOptica}>Sin pagos existentes</Text>
        </View>
      ) : (
        <FlatList
          style={{
            height: 850,
          }}
          data={purchasedProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => <Text>No tienes productos en tu boleta.</Text>}
        />
      )}
    </View>
  );
}
