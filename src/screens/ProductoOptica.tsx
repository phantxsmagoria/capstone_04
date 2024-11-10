import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig'; // Asegúrate de que la configuración de Firebase está correcta
import { collection, addDoc } from 'firebase/firestore';
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

export default function ProductoOptica({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [categoria, setCategoria] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddProduct = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!nombre || !descripcion || !precio || !imagenURL || !categoria) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      await addDoc(collection(db, 'productos'), {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenURL,
        categoria,
        usuarioId: auth.currentUser?.uid, // Asegúrate de que el usuario está autenticado
      });
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
      {/*este es para el botón para regresar atrás*/}
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
      {/*esto es para crear el formulario de crear producto*/}
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
    </View>
  );
}