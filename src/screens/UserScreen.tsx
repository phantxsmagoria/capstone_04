import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import styles2 from '../styles/styles2';

type RootStackParamList = { Usuario: undefined; Buscar: undefined; Carrito: undefined; Home: undefined; ProductoCliente: undefined; };
type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Usuario'>;
type UserScreenRouteProp = RouteProp<RootStackParamList, 'Usuario'>;
type Props = { navigation: UserScreenNavigationProp; route: UserScreenRouteProp; };

interface SliderData { name: string; imageURL: string; }
interface ProductoData {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
  quantity: number;
}
interface CartItem extends ProductoData { 
  cantidadLlevada: number; 
}

export default function UserScreen({ navigation }: Props) {
  const [sliderList, setSliderList] = useState<SliderData[]>([]);
  const [userName, setUserName] = useState<string>('Usuario');
  const [productoList, setProductoList] = useState<ProductoData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    GetSliderList();
    fetchUserName();
    GetProductoList();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    try {
      const q = query(collection(db, 'sliders'));
      const querySnapshot = await getDocs(q);
      const sliders: SliderData[] = [];
      querySnapshot.forEach((doc) => {
        sliders.push(doc.data() as SliderData);
      });
      setSliderList(sliders);
    } catch (error) {
      console.error("Error fetching slider data: ", error);
    }
  };

  const fetchUserName = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserName(userData.name);
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    } else {
      console.error("No user is logged in");
    }
  };

  const GetProductoList = async () => {
    setProductoList([]);
    try {
      const q = query(collection(db, 'productos'));
      const querySnapshot = await getDocs(q);
      const productos: ProductoData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productos.push({ id: doc.id, ...data } as ProductoData);
      });
      setProductoList(productos);
    } catch (error) {
      console.error("Error fetching producto data: ", error);
    }
  };

  const addToCart = async (product: ProductoData) => {
    try {
      const uid = await AsyncStorage.getItem('userUID');
      const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
      let cartItems = savedCart ? JSON.parse(savedCart) : [];
  
      // Verificar si el producto ya está en el carrito
      const productIndex = cartItems.findIndex((item: CartItem) => item.id === product.id);
      if (productIndex > -1) {
        // Si el producto ya está en el carrito, verificar cantidad disponible
        if (cartItems[productIndex].cantidadLlevada < product.quantity) {
          // Incrementar cantidad llevada si hay stock disponible
          cartItems[productIndex].cantidadLlevada += 1;
        } else {
          Alert.alert('Stock insuficiente', 'No hay más unidades disponibles de este producto.');
          return;
        }
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad llevada inicializada en 1
        if (product.quantity > 0) {
          cartItems.push({ ...product, cantidadLlevada: 1 });
        } else {
          Alert.alert('Stock insuficiente', 'No hay unidades disponibles de este producto.');
          return;
        }
      }
  
      await AsyncStorage.setItem(`cart_${uid}`, JSON.stringify(cartItems));
      setModalVisible(true);
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      Alert.alert('Error', 'Hubo un problema al agregar el producto al carrito');
    }
  };
  
  

  const filteredProducts = productoList.filter(product =>
    product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) && product.quantity > 0
  );
  
  

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <View style={{ padding: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>Hola,</Text>
            <Text style={{ fontSize: 20 }}>{userName}</Text>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              backgroundColor: '#FA7929',
              padding: 10,
              marginVertical: 10,
              marginTop: 15,
              borderRadius: 10,
            }}>
              <Ionicons name="search" size={24} color="white" />
              <TextInput
                placeholder='Buscador'
                style={{ color: '#ffff', fontSize: 16 }}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <FlatList
              data={sliderList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 20 }}
              renderItem={({ item }) =>
                <Image
                  source={{ uri: item.imageURL }}
                  style={{
                    width: 300,
                    height: 160,
                    borderRadius: 15,
                    marginRight: 20,
                    marginTop: 10,
                  }}
                />
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        }
        renderItem={({ item, index }) => {
          const isLastItem = index === productoList.length - 1;
          const isOdd = productoList.length % 2 !== 0;
          return (
            <View style={[styles.productoContainer, isLastItem && isOdd ? styles.singleColumnItem : {}]}>
              <Image
                source={{ uri: item.imagenURL }}
                style={styles2.productImage}
              />
              <Text style={styles2.productTitle}>{item.nombre}</Text>
              <Text>{item.categoria}</Text>
              <Text style={styles2.productPrice}>${item.precio}</Text>
              <TouchableOpacity
                style={styles2.addButton}
                onPress={() => addToCart(item)}
              >
                <Ionicons name="cart" size={24} color="white" />
                <Text style={styles2.addButtonText}>Agregar al carrito</Text>
              </TouchableOpacity>
              

            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles2.modalBackground}>
          <View style={styles2.modalContainer}>
            <Text style={styles2.modalText}>¡Producto agregado al carrito!</Text>
            <Pressable
              style={styles2.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles2.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
