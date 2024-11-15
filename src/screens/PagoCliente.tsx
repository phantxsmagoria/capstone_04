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

type PagoClienteNavigationProp = StackNavigationProp<RootStackParamList, 'Pago'>;
type PagoClienteRouteProp = RouteProp<RootStackParamList, 'Pago'>;

type Props = {
  navigation: PagoClienteNavigationProp;
  route: PagoClienteRouteProp;
};

type CartItem = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number | null;
  imagenURL: string | null;
  quantity: number;
};

const PagoCliente: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);


  const loadCart = async () => {
    const uid = await AsyncStorage.getItem('userUID');
    const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      console.log('Parsed Cart:', parsedCart); 
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
      console.log('Item:', item);
      if (item.precio != null) {
        totalPrecio += item.precio;
      }
    });

    setTotalPrice(totalPrecio);
  };

  const confirmOrder = async () => {

  };

  return (
    <View style={styles.fondoView2}>
      <Text style={{fontSize:35, fontWeight: 500, marginTop:60, marginLeft:20, marginBottom: 20,}}>Pagar</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.cartItem, {marginLeft: 14,}]}>
            <Text style={[styles.productTitle, {backgroundColor: '#fff'}]}>{item.nombre}</Text>
            <Text style={styles.productPrice}> ${item.precio}</Text>
          </View>
        )}
      />

      <View style={styles.fondoView}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginBottom: 20, }}>Total: ${totalPrice}</Text>

      <TouchableOpacity style={[styles.button, {alignContent: 'center', justifyContent: 'center', marginLeft: 80}]} onPress={() => navigation.navigate('DatosCompra')}> 
        <Text style={styles.buttonText}>Confirma pedido</Text> 
      </TouchableOpacity>

      </View>  
    </View>
  );
};

export default PagoCliente;
