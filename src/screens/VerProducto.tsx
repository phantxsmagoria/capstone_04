import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles2 from '../styles/styles2';

type RootStackParamList = {
  VerProducto: undefined;
  ProductoOptica: undefined;
  OpticaScreen: undefined;
};

type VerProductoNavigationProp = StackNavigationProp<RootStackParamList, 'VerProducto'>;
type VerProductoRouteProp = RouteProp<RootStackParamList, 'VerProducto'>;

type Props = {
  navigation: VerProductoNavigationProp;
  route: VerProductoRouteProp;
};

interface ProductoData {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
}

export default function VerProducto({ navigation }: Props) {
  const [productoList, setProductoList] = useState<ProductoData[]>([]);

  useEffect(() => {
    GetProductoList();
  }, []);

  const GetProductoList = async () => {
    setProductoList([]);
    try {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const q = query(collection(db, 'productos'), where('usuarioId', '==', uid));
        const querySnapshot = await getDocs(q);
        const productos: ProductoData[] = [];
        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          // Obtener el documento de imagenData
          const imagenDataRef = collection(db, `productos/${doc.id}/imagenData`);
          const imagenDataSnapshot = await getDocs(imagenDataRef);
          let imagenURL = '';
          imagenDataSnapshot.forEach((imagenDoc) => {
            if (imagenDoc.data().uri) {
              imagenURL = imagenDoc.data().uri;
            }
          });

          const producto = {
            id: doc.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            imagenURL,
            categoria: data.categoria,
          };
          productos.push(producto);
        }
        setProductoList(productos);
      }
    } catch (error) {
      console.error("Error fetching producto data: ", error);
    }
  };

  return (
    <View style={styles2.container}>
      <TouchableOpacity onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={30} color="#FA7929" style={{paddingTop:20,}}/>
        <Text style={styles2.titulosPagina}>Mi Catálogo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          padding: 20,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
        onPress={() => navigation.navigate('ProductoOptica')}
      >
        <MaterialIcons name="create" size={24} color="black" />
        <Text style={{paddingTop:0,}}>Crear Nuevo Producto</Text>
      </TouchableOpacity>

      <FlatList
        data={productoList}
        renderItem={({ item }) => (
          <View style={styles2.productContainer}>
            <Text style={styles2.productTitle}>{item.nombre}</Text>
            <Image
              source={{ uri: item.imagenURL }} // Usamos la URL de Firebase Storage
              style={styles2.productImage}
            />
            <Text style={styles2.productDescription}>{item.descripcion}</Text>
            <Text style={styles2.productPrice}>${item.precio}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
