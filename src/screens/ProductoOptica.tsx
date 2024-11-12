import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig'; 
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker'; 
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles2 from '../styles/styles2';


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

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      const image = result.assets[0];
      if (image.uri) {
        setImagenURL(image.uri); // Guardamos la URI de la imagen seleccionada
      }
    }
  };

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
    <View style={styles2.container}>
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
        fontSize: 30,
        marginTop: 20,
        marginBottom:50,
        color: '#000',
        marginLeft: 30,

       }}>Añadir nuevo producto</Text>
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
        placeholder="Categoría del producto"
        style={styles.inputLine}
        placeholderTextColor="#aaa"
        value={categoria}
        onChangeText={setCategoria}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Añadir Producto</Text>
      </TouchableOpacity>
    </View>
  );
}
