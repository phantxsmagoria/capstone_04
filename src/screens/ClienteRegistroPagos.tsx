import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';

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
}

export default function ClienteRegistroPagos({ navigation }: Props) {
  const [purchasedProducts, setPurchasedProducts] = useState<ProductoData[]>([]);

  useEffect(() => {
    fetchPurchasedProducts();
  }, []);

  const fetchPurchasedProducts = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(collection(db, 'boletacliente'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      const purchasedProductIds: string[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Data from boletacliente:", data);
        if (data.cartItems) {
          const productoIds = data.cartItems.map((item: { productoId: string }) => item.productoId);
          purchasedProductIds.push(...productoIds);
        }
      });

      if (purchasedProductIds.length > 0) {
        // Eliminar duplicados
        const uniqueProductIds = [...new Set(purchasedProductIds)];
        console.log("Unique Product IDs to fetch:", uniqueProductIds);

        const productos: ProductoData[] = [];
        // Dividir en lotes si hay más de 10 IDs
        const batches = [];
        while (uniqueProductIds.length) {
          batches.push(uniqueProductIds.splice(0, 10));
        }

        for (const batch of batches) {
          const productosSnapshot = await getDocs(query(collection(db, 'productos'), where('__name__', 'in', batch)));
          productosSnapshot.forEach((doc) => {
            productos.push({ id: doc.id, ...doc.data() } as ProductoData);
          });
        }
        
        setPurchasedProducts(productos);
        console.log("Purchased products data:", productos);
      }
    } catch (error) {
      console.error("Error fetching purchased products:", error);
    }
  };

  const renderItem = ({ item }: { item: ProductoData }) => (
    <View style={styles.productoContainer}>
      <Image
        source={{ uri: item.imagenURL }}
        style={styles.productImage}
      />
      <Text style={styles.productTitle}>{item.nombre}</Text>
      <Text>{item.categoria}</Text>
      <Text style={styles.productPrice}>${item.precio}</Text>
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => navigation.navigate('AgregarReseñaScreen', { productId: item.id })}
      >
        <Text style={styles.reviewButtonText}>Agregar Reseña</Text>
      </TouchableOpacity>
    </View>
  );

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
