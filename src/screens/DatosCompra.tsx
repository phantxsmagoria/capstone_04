import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

type RootStackParamList = {
  Pago: undefined;
  DatosCompra: undefined;
};

type DatosCompraNavigationProp = StackNavigationProp<RootStackParamList, 'DatosCompra'>;
type DatosCompraRouteProp = RouteProp<RootStackParamList, 'DatosCompra'>;

type Props = {
  navigation: DatosCompraNavigationProp;
  route: DatosCompraRouteProp;
};

type CartItem = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagenURL: string | null;
  quantity: number;
};

const DatosCompra: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const loadCart = async () => {
    const uid = await AsyncStorage.getItem('userUID');
    const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      setCartItems(parsedCart);
      calculateTotals(parsedCart);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const calculateTotals = (items: CartItem[]) => {
    let totalPrecio = 0;

    items.forEach(item => {
      if (item.precio != null) {
        totalPrecio += item.precio;
      }
    });

    setTotalPrice(totalPrecio);
  };

  const confirmOrder = async () => {
    if (name.trim() === '' || address.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre y una dirección de entrega');
      return;
    }
  };

  return (
    <View style={styles.fondoView2}>
      <Text style={{fontSize: 35, fontWeight: 500, marginTop: 60, marginLeft: 20}}>Datos de Compra</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.cartItem, { marginLeft: 14 }]}>
            <Text style={styles.productTitle}>{item.nombre}</Text>
            <Text style={styles.productPrice}>${item.precio}</Text>
          </View>
        )}
      />

      <View style={styles.fondoView}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Total: ${totalPrice}</Text>

        <TextInput
          style={[styles.inputLine, { marginLeft: 20, marginTop: 20 }]}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.inputLine, { marginLeft: 20, marginTop: 20 }]}
          placeholder="Dirección de entrega"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={[styles.button, { alignContent: 'center', justifyContent: 'center', marginLeft: 80 }]} onPress={confirmOrder}>
          <Text style={styles.buttonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DatosCompra;
