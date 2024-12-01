import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import styles from '../styles/styles';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
  VerProducto: undefined;
  EditarProducto: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenURL: string;
    categoria: string;
    quantity: number;
  };
};

type EditarProductoNavigationProp = StackNavigationProp<RootStackParamList, 'EditarProducto'>;
type EditarProductoRouteProp = RouteProp<RootStackParamList, 'EditarProducto'>;

type Props = {
  navigation: EditarProductoNavigationProp;
  route: EditarProductoRouteProp;
};

const EditarProducto: React.FC<Props> = ({ navigation, route }) => {
  const { id, nombre, descripcion, precio, imagenURL, categoria, quantity } = route.params;

  // Comprobemos que los parámetros están correctamente pasados
  console.log('ID:', id);
  console.log('Nombre:', nombre);
  console.log('Descripción:', descripcion);
  console.log('Precio:', precio);
  console.log('Imagen URL:', imagenURL);
  console.log('Categoría:', categoria);
  console.log('Cantidad:', quantity);

  const [nombreState, setNombre] = useState(nombre);
  const [descripcionState, setDescripcion] = useState(descripcion);
  const [precioState, setPrecio] = useState(String(precio));
  const [imagenURLState, setImagenURL] = useState(imagenURL);
  const [categoriaState, setCategoria] = useState(categoria);
  const [quantityState, setQuantity] = useState(String(quantity));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets) {
      const image = result.assets[0];
      if (image.uri) {
        setSelectedImage(image); // Guardamos el objeto de la imagen seleccionada
        setImagenURL(image.uri); // Guardamos la URI de la imagen seleccionada
      }
    }
  };

  const handlePriceChange = (text: string) => { 
    const formattedText = text.replace(/[^0-9.]/g, '');
    const validText = formattedText.split('.').length > 2 ? formattedText.split('.').slice(0, 2).join('.') : formattedText;
    setPrecio(validText); 
  };

  const handleQuantityChange = (text: string) => { 
    const formattedText = text.replace(/[^0-9]/g, '');
    setQuantity(formattedText); 
  };

  const handleUpdateProduct = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!nombreState || !descripcionState || !precioState || !imagenURLState || !categoriaState || !quantityState) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      const productRef = doc(db, 'productos', id);
      await updateDoc(productRef, {
        nombre: nombreState,
        descripcion: descripcionState,
        precio: parseFloat(precioState),
        imagenURL: imagenURLState,
        categoria: categoriaState,
        quantity: parseInt(quantityState),
      });
      setSuccessMessage('Producto actualizado con éxito.');
      navigation.goBack();  // Regresa a la pantalla anterior después de actualizar el producto
    } catch (error) {
      console.error('Error al actualizar el producto: ', error);
      setErrorMessage('Error al actualizar el producto.');
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
        fontSize: 30,
        marginTop: 20,
        marginBottom: 50,
        color: '#000',
        marginLeft: 30,
      }}>Editar producto</Text>
      <TextInput
        placeholder="Nombre del producto"
        style={styles.inputLine}
        value={nombreState}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Descripción del producto"
        style={styles.inputLine}
        value={descripcionState}
        onChangeText={setDescripcion}
      />
      <TextInput
        placeholder="Precio del producto"
        style={styles.inputLine}
        keyboardType="numeric"
        value={precioState}
        onChangeText={handlePriceChange}
      />
      <TextInput
        placeholder="Cantidad"
        style={styles.inputLine}
        keyboardType="numeric"
        value={quantityState}
        onChangeText={handleQuantityChange}
      />
      <Text>Categorias</Text>
      <Text> </Text>
      <Picker
        selectedValue={categoriaState}
        style={styles.inputLine}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        <Picker.Item label="Marcos" value="Marcos" />
        <Picker.Item label="Cristales" value="Cristales" />
        <Picker.Item label="Lentes de sol" value="Lentes de sol" />
        <Picker.Item label="Otros" value="Otros" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200, marginVertical: 20 }}
        />
      )}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
        <Text style={styles.buttonText}>Actualizar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const localStyles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditarProducto;
