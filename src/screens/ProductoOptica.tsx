import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker';

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
  quantity: number;
};

export default function ProductoOptica({ navigation }: Props) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagenURL, setImagenURL] = useState('');
  const [categoria, setCategoria] = useState('Marcos');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

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
        setSelectedImage(image);
        setImagenURL(image.uri);
      }
    }
  };

  const handleAddProduct = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!nombre || !descripcion || !precio || !imagenURL || !categoria || !quantity) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      const userEmail = auth.currentUser?.email;
      if (!userEmail) {
        setErrorMessage('No se pudo obtener el correo electrónico del usuario.');
        return;
      }

      const user = auth.currentUser;
      if (!user) {
        setErrorMessage('No se ha iniciado sesión.');
        return;
      }

      const userQuery = query(collection(db, 'opticas'), where('uid', '==', user.uid));
      const userSnapshot = await getDocs(userQuery);
      if (userSnapshot.empty) {
        setErrorMessage('No se pudo encontrar la información de la óptica.');
        return;
      }
      const opticaData = userSnapshot.docs[0].data();

      const docRef = await addDoc(collection(db, 'productos'), {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenURL,
        categoria,
        quantity: parseInt(quantity),
        usuarioId: auth.currentUser?.uid,
        opticaEmail: userEmail,
        nombreOptica: opticaData.nombreOptica,
        rut: opticaData.rut, 
      });
      const newProduct = {
        id: docRef.id,
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagenURL,
        categoria,
        quantity: parseInt(quantity),
        usuarioId: auth.currentUser?.uid,
        opticaEmail: userEmail,
        nombreOptica: opticaData.nombreOptica,
        rut: opticaData.rut, 
      };
      setProducts([...products, newProduct]);
      setSuccessMessage('Producto añadido con éxito.');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setImagenURL('');
      setCategoria('Marcos');
      setQuantity('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error añadiendo producto: ', error);
      setErrorMessage('Error al añadir producto.');
    }
  };

  const handlePriceChange = (text: string) => {
    const formattedText = text.replace(/[^0-9.]/g, '');
    const validText = formattedText.split('.').length > 2 
      ? formattedText.split('.').slice(0, 2).join('.') 
      : formattedText;
    setPrecio(validText);
  };

  const handleQuantityChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setQuantity(formattedText);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginTop: -200 }}>
      <TouchableOpacity onPress={() => navigation.navigate('VerProducto')} style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: -30 }}>
        <MaterialIcons name="arrow-back-ios" size={30} color="#FA7929" />
      </TouchableOpacity>
      <Text style={{ fontSize: 25, marginRight: 90, paddingBottom: 100 }}>Añadir nuevo producto</Text>
      <View style={{ alignItems: 'center', width: '85%' }}>
        <TextInput
          placeholder="Nombre del producto"
          style={{ height: 30, borderBottomColor: '#FA7929', borderBottomWidth: 1, marginBottom: 30, backgroundColor: 'transparent', fontSize: 12, width: '100%' }}
          placeholderTextColor="#aaa"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          placeholder="Descripción del producto"
          style={{ height: 30, borderBottomColor: '#FA7929', borderBottomWidth: 1, marginBottom: 30, backgroundColor: 'transparent', fontSize: 12, width: '100%' }}
          placeholderTextColor="#aaa"
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          placeholder="Precio del producto"
          style={{ height: 30, borderBottomColor: '#FA7929', borderBottomWidth: 1, marginBottom: 30, backgroundColor: 'transparent', fontSize: 12, width: '100%' }}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
          value={precio}
          onChangeText={handlePriceChange}
        />
        <TextInput
          placeholder="Cantidad en stock"
          style={{ height: 30, borderBottomColor: '#FA7929', borderBottomWidth: 1, marginBottom: 30, backgroundColor: 'transparent', fontSize: 12, width: '100%' }}
          keyboardType="numeric"
          placeholderTextColor="#aaa"
          value={quantity}
          onChangeText={handleQuantityChange}
        />
        <Text style={{ textAlign: 'left', width: '100%', marginBottom: 10 }}>Categorías</Text>
        <Picker
          selectedValue={categoria}
          style={{ height: 30, borderBottomColor: '#FA7929', borderBottomWidth: 1, marginBottom: 30, backgroundColor: 'transparent', fontSize: 12, width: '100%' }}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          <Picker.Item label="Marcos" value="Marcos" />
          <Picker.Item label="Cristales" value="Cristales" />
          <Picker.Item label="Lentes de sol" value="Lentes de sol" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
        <TouchableOpacity style={{ width: '63%', height: 40, backgroundColor: '#FA7929', justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 10 }} onPress={pickImage}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Seleccionar Imagen</Text>
        </TouchableOpacity>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage.uri }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
        )}
        <TouchableOpacity style={{ width: '63%', height: 40, backgroundColor: '#FA7929', justifyContent: 'center', alignItems: 'center', borderRadius: 4, marginTop: 10 }} onPress={handleAddProduct}>
          <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Añadir Producto</Text>
        </TouchableOpacity>
        {errorMessage ? <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={{ color: 'green', fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>{successMessage}</Text> : null}
      </View>
    </View>
  );
}
