import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebaseConfig'; // Asegúrate de que la configuración de Firebase está correcta
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
  Home: undefined;
  RegisterOpticaDocumento: undefined;
  ProductoOptica: undefined;
  VerProducto: undefined;
};

type ProductoOpticaNavigationProp = StackNavigationProp<RootStackParamList, 'ProductoOptica'>;
type ProductoOpticaRouteProp = RouteProp<RootStackParamList, 'ProductoOptica'>;
type Props = {
  navigation: ProductoOpticaNavigationProp;
  route: ProductoOpticaRouteProp;
};

type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
};

export default function ProductoOptica({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [categoria, setCategoria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        const productQuery = query(collection(db, 'productos'), where('usuarioId', '==', uid));
        const querySnapshot = await getDocs(productQuery);
        const loadedProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setProducts(loadedProducts);
      }
    };
    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!nombre || !descripcion || !precio || !imagenURL || !categoria) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'productos'), {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenURL,
        categoria,
        usuarioId: auth.currentUser?.uid, // Asegúrate de que el usuario está autenticado
      });
      const newProduct = {
        id: docRef.id,
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenURL,
        categoria,
        usuarioId: auth.currentUser?.uid,
      };
      setProducts([...products, newProduct]);
      setSuccessMessage('Producto añadido con éxito.');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagenURL('');
      setCategoria('');
    } catch (error) {
      console.error('Error añadiendo producto: ', error);
      setErrorMessage('Error al añadir producto.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{
        position: 'absolute',
        top: 21.5,
        left: 0.2,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }} onPress={() => navigation.navigate('VerProducto')}>
        <MaterialIcons name="arrow-back-ios" size={30} color="#FA7929" />
      </TouchableOpacity>
      <Text style={{ 
        fontSize: 40,
        marginBottom: 40,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 30,
       }}>Añadir Nuevo Producto</Text>
      <TextInput
        placeholder="Nombre del producto"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Descripción del producto"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        placeholder="Precio del producto"
        style={styles.inputLine}
        keyboardType="numeric"
        placeholderTextColor="#aaa"
        value={precio}
        onChangeText={setPrecio}
      />
      <TextInput
        placeholder="URL de la imagen del producto"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={imagenURL}
        onChangeText={setImagenURL}
      />
      <TextInput
        placeholder="Categoría del producto"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={categoria}
        onChangeText={setCategoria}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Añadir Producto</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
            <Text>{item.precio}</Text>
          </View>
        )}
      />
    </View>
  );
}
