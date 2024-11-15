import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type RootStackParamList = {
    Pago: undefined;
    DatosCompra: undefined;
    Carrito: undefined,
    ReciboBoletaCliente: undefined;
    Usuario: undefined;
    MainTabs: undefined;
};

type ReciboBoletaClienteNavigationProp = StackNavigationProp<RootStackParamList, 'ReciboBoletaCliente'>;
type ReciboBoletaClienteRouteProp = RouteProp<RootStackParamList, 'ReciboBoletaCliente'>;

type Props = {
    navigation: ReciboBoletaClienteNavigationProp;
    route: ReciboBoletaClienteRouteProp;
};

type CartItem = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number | null;
    imagenURL: string | null;
    quantity: number;
};

interface DatosBoletaData {

}

export default function ReciboBoletaCliente({ navigation }: Props) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [nameaddress, setNameAddress] = useState<DatosBoletaData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const loadCart = async () => {
        const uid = await AsyncStorage.getItem('userUID');
        const savedCart = await AsyncStorage.getItem(`cart_${uid}`);
        if (savedCart) {
            const parsedCart: CartItem[] = JSON.parse(savedCart);
            setCartItems(parsedCart);
            calculateTotals(parsedCart);
        }
        
        const GetNameAddress = async () => {

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


    return (
        <View style={styles.fondoView2}>
            <View>
                <Text style={styles.tituloMenusOptica}>Boleta</Text>
            </View>
            <View style={styles.fondoView}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>Total: ${totalPrice}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>Total: ${totalPrice}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginLeft: 20 }}>Total: ${totalPrice}</Text>
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => (
                    <View style={[styles.cartItem, { marginLeft: 14 }]}>
                        <Text style={styles.productTitle}>{item.nombre}</Text>
                        <Text style={styles.productPrice}> ${item.precio}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={[styles.button, { alignContent: 'center', justifyContent: 'center', marginLeft: 80 }]} onPress={() => navigation.navigate('MainTabs')}>
                <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>

        </View>
    )
}