import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles2 from '../styles/styles2';

type RootStackParamList = {
  VerProducto: undefined;
  ProductoOptica: undefined;
  OpticaScreen: undefined;
  EditarProducto: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenURL: string;
    categoria: string;
    quantity: number; // Añadimos 'quantity'
  };
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
  quantity: number; // Añadimos 'quantity'
}

export default function VerProducto({ navigation }: Props) {
  const [productoList, setProductoList] = useState<ProductoData[]>([]);

  // Fetch product list when the component mounts
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
          const producto = {
            id: doc.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            imagenURL: data.imagenURL, // Usamos la URL de Firebase Storage directamente
            categoria: data.categoria,
            quantity: data.quantity // Añadimos 'quantity'
          };
          productos.push(producto);
        }
        setProductoList(productos);
      }
    } catch (error) {
      console.error("Error fetching producto data: ", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Referencia al documento que se va a eliminar
      const productDocRef = doc(db, 'productos', id);

      // Eliminar el documento de Firebase
      await deleteDoc(productDocRef);

      // Actualizar la lista de productos después de la eliminación
      setProductoList((prevProductoList) => prevProductoList.filter((producto) => producto.id !== id));

      Alert.alert('Éxito', 'Producto eliminado correctamente');
    } catch (error) {
      console.error("Error deleting product: ", error);
      Alert.alert('Error', 'Hubo un problema al eliminar el producto');
    }
  };

  return (
    <View style={styles2.container}>
      <TouchableOpacity onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={30} color="#FA7929" style={{paddingTop:20}}/>
        <Text style={styles2.titulosPagina}>Mi Catálogo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles2.nuevoProducto}
        onPress={() => navigation.navigate('ProductoOptica')}
      >
        <MaterialIcons name="create" size={24} color="black" />
        <Text style={{paddingTop:0}}>Crear Nuevo Producto</Text>
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
            <Text style={styles2.productPrice}>Cantidad: {item.quantity}</Text>
            <Text style={styles2.productPrice}>Precio: ${item.precio}</Text>
            <TouchableOpacity 
              style={styles2.button}
              onPress={() => navigation.navigate('EditarProducto', {
                id: item.id,
                nombre: item.nombre,
                descripcion: item.descripcion,
                precio: item.precio,
                imagenURL: item.imagenURL,
                categoria: item.categoria,
                quantity: item.quantity // Asegurándonos de pasar 'quantity'
              })}
            >
              <Text style={styles2.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles2.button, styles2.deleteButton]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles2.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
