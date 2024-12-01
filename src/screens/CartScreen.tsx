import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

type RootStackParamList = {
  Carrito: undefined;
  Usuario: undefined;
  Home: undefined;
  Pago: undefined; 
  DireccionCliente: undefined;
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
  descripcion: string;
  precio: number | null;
  imagenURL: string | null;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadCart = async () => {
    const uid = await AsyncStorage.getItem('userUID');
    const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      console.log(parsedCart);
      setCartItems(parsedCart);
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
    return cartItems.reduce((total, item) => total + (item.precio || 0), 0);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 20, paddingTop: 40 }}>
      <Text style={[styles.title, { textAlign: 'center', marginTop: 0, marginBottom: 20, }]}>Carrito</Text>

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
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Orden total</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Costo de Envío: Gratis</Text>
        <Text style={{ fontSize: 16, marginBottom: 5,fontWeight:'bold', }}>Costo Total: ${calculateTotalPrice()}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Tiempo de entrega: 10 días hábiles</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DireccionCliente')}>
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
