import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles'; //Hola

type RootStackParamList = {
  Carrito: undefined;
  Buscar: undefined;
  Usuario: undefined;
  Home: undefined;
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Carrito'>;
type CartScreenRouteProp = RouteProp<RootStackParamList, 'Carrito'>;

type Props = {
  navigation: CartScreenNavigationProp;
  route: CartScreenRouteProp;
};

type CartItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      const uid = await AsyncStorage.getItem('userUID');
      const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  const toggleSelectItem = (itemId: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const removeFromCart = async (itemIds: string[]) => {
    const updatedCart = cartItems.filter(item => !itemIds.includes(item.id));
    setCartItems(updatedCart);
    const uid = await AsyncStorage.getItem('userUID');
    await AsyncStorage.setItem(`cart_${uid}`, JSON.stringify(updatedCart));
    setSelectedItems([]);
  };

  const handleRemoveSelectedItems = () => {
    removeFromCart(selectedItems);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 20, paddingTop: 40 }}>
      <Text style={[styles.title, { textAlign: 'center', marginTop: 0 }]}>Carrito</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => toggleSelectItem(item.id)}>
            <View style={[styles.cartItem, { backgroundColor: selectedItems.includes(item.id) ? '#ddd' : '#fff' }]}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <TouchableOpacity style={styles.trashButton} onPress={() => removeFromCart([item.id])}>
                <Icon name="trash" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedItems.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <Button title="Eliminar Seleccionados" onPress={handleRemoveSelectedItems} color="red" />
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Orden</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Costo de Envío: Gratis</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Costo Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Tiempo de entrega: 10 días hábiles</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
