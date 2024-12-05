import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebaseConfig'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import styles from '../styles/styles';

type RootStackParamList = {
  Carrito: undefined;
  Usuario: undefined;
  Home: undefined;
  Pago: undefined;
  DatosCompra: undefined; 
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Carrito'>;
type CartScreenRouteProp = RouteProp<RootStackParamList, 'Carrito'>;

type Props = {
  navigation: CartScreenNavigationProp;
  route: CartScreenRouteProp;
};

type CartItem = {
  id: string;
  nombre: string;
  precio: number | null;
  imagenURL: string | null;
  quantity: number; 
  maxQuantity: number; 
  cantidadLlevada: number; 
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadCart = async () => {
    const uid = await AsyncStorage.getItem('userUID');
    const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);

      
      const updatedCart: CartItem[] = [];
      for (const item of parsedCart) {
        const productRef = doc(db, 'productos', item.id);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          const maxQuantity = productData.quantity; 
          const cantidadLlevada = item.cantidadLlevada || 1; 
          updatedCart.push({ ...item, quantity: productData.quantity, maxQuantity, cantidadLlevada });
        } else {
          updatedCart.push(item);
        }
      }
      setCartItems(updatedCart);
    }
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      loadCart();
    });

    return () => {
      focusListener();
    };
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCart();
    setRefreshing(false);
  };

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const removeFromCart = async (itemIds: string[]) => {
    const uid = await AsyncStorage.getItem('userUID');
    const updatedCart = cartItems.filter((item) => !itemIds.includes(item.id));
    setCartItems(updatedCart);
    await AsyncStorage.setItem(`cart_${uid}`, JSON.stringify(updatedCart));
    setSelectedItems([]);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + ((item.precio || 0) * item.cantidadLlevada), 0);
  };

  const increaseQuantity = async (itemId: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.cantidadLlevada < item.maxQuantity) {
        const newCantidadLlevada = item.cantidadLlevada + 1;
        return { ...item, cantidadLlevada: newCantidadLlevada };
      }
      return item;
    });
    setCartItems(updatedCart);
    await saveCart(updatedCart);
  };

  const decreaseQuantity = async (itemId: string) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.cantidadLlevada > 1) {
        const newCantidadLlevada = item.cantidadLlevada - 1;
        return { ...item, cantidadLlevada: newCantidadLlevada };
      }
      return item;
    });
    setCartItems(updatedCart);
    await saveCart(updatedCart);
  };

  const saveCart = async (updatedCart: CartItem[]) => {
    const uid = await AsyncStorage.getItem('userUID');
    await AsyncStorage.setItem(`cart_${uid}`, JSON.stringify(updatedCart));
  };

  const confirmOrder = async () => {
    try {
      for (const item of cartItems) {
        const productRef = doc(db, 'productos', item.id);
        await updateDoc(productRef, { quantity: item.quantity - item.cantidadLlevada });
      }
      navigation.navigate('DatosCompra');
    } catch (error) {
      console.error('Error al confirmar el pedido:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 20, paddingTop: 40 }}>
      <Text style={[styles.title, { textAlign: 'center', marginTop: 0, marginBottom: 20 }]}>Carrito</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => toggleSelectItem(item.id)}>
            <View
              style={[
                styles.cartItem,
                selectedItems.includes(item.id) ? styles.selectedItem : styles.unselectedItem,
              ]}
            >
              <Image
                source={{ uri: item.imagenURL || 'https://via.placeholder.com/150' }}
                style={styles.productImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>{item.nombre}</Text>
                <Text style={styles.productPrice}>${item.precio}</Text>
                <Text style={styles.productDescription}>Cantidad llevada: {item.cantidadLlevada}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Icon name="minus-circle" size={20} color="#FA7929" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.cantidadLlevada}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <Icon name="plus-circle" size={20} color="#FA7929" />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.trashButton}
                onPress={() => removeFromCart([item.id])}
              >
                <Icon name="trash" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: 850 }}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Orden total</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Costo de Envío: Gratis</Text>
        <Text style={{ fontSize: 16, marginBottom: 5, fontWeight: 'bold' }}>Costo Total: ${calculateTotalPrice()}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Tiempo de entrega: 10 días hábiles</Text>
        <TouchableOpacity style={styles.button} onPress={confirmOrder}>
          <Text style={styles.buttonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
