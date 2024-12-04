import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RNPinckerSelect from 'react-native-picker-select';
import Ionicons from '@expo/vector-icons/Ionicons';

type RootStackParamList = {
  Carrito: undefined;
  DatosCompra: undefined;
  ReciboBoletaCliente: undefined;
  MainTabs: undefined;
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

type SeleccionItem = {
  label: string;
  value: string;
};

const DatosCompra: React.FC<Props> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nombreTarjeta, setNombreTarjeta] = useState<string>('')
  const [numeroTarjeta, setNumeroTarjeta] = useState<string>('')
  const [diaTarjeta, setDiaTarjeta] = useState<string>('')
  const [mesTarjeta, setMesTarjeta] = useState<string>('')
  const [cvvTarjeta, setCvvTarjeta] = useState<string>('')
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [comuna, setComuna] = useState<SeleccionItem[]>([]);
  const [ciudad, setCiudad] = useState<SeleccionItem[]>([]);
  const [seleccionarComuna, setSelecionarComuna] = useState<string | null>(null);
  const [seleccionarCiudad, setSelecionarCiudad] = useState<string | null>(null);

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
    fetchLocalidadData();
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

  const fetchLocalidadData = async () => {
    const comunaSnapshot = await getDocs(collection(db, 'comuna'));
    const comunaList = comunaSnapshot.docs.map(doc => ({
      label: doc.data().nom_comuna,
      value: doc.data().nom_comuna,
    }));
    setComuna(comunaList);

    const ciudadSnapshot = await getDocs(collection(db, 'ciudad'));
    const ciudadList = ciudadSnapshot.docs.map(doc => ({
      label: doc.data().nom_ciudad,
      value: doc.data().nom_ciudad,
    }));
    setCiudad(ciudadList);
  };

  const validarDatos = () => {
    if (name.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre.');
      return false;
    }
    if (address.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu dirección.');
      return false;
    }
    if (!/^\d{9}$/.test(phone)) {
      Alert.alert('Error', 'Por favor ingresa un tu número de teléfono.')
      return false;
    }

    if (nombreTarjeta.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el nombre del titular de la tarjeta.');
      return false;
    }
    if (!/^\d{16}/.test(numeroTarjeta)) {
      Alert.alert('Error', 'Por favor ingresa un el número de la tarjeta.')
      return false;
    }
    if (!/^\d{3}$/.test(cvvTarjeta)) {
      Alert.alert('Error', 'Por favor ingresa el cvv de la tarjeta.')
      return false;
    }
    return true;
  };

  const confirmOrder = async () => {
    if (!validarDatos()) {
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Error', 'No se ha iniciado sesión');
        return;
      }

      await addDoc(collection(db, 'boletacliente'), {
        uid: user.uid,
        email: user.email,
        name,
        address,
        comuna: seleccionarComuna,
        ciudad: seleccionarCiudad,
        cartItems: cartItems.map(item => ({ ...item, productoId: item.id })), // Incluimos productoId en los items del carrito
        totalPrice,
      });

      Alert.alert('Guardado con Éxito', 'Su boleta ha sido creada con éxito.');
      navigation.navigate('MainTabs'); // Navegamos a la pantalla de pestañas principales
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear su boleta.');
      console.error('Error con su boleta: ', error);
    }
  };

  const handleDiaBlur = () => {
    const num = parseInt(diaTarjeta, 10);
    if(!isNaN(num) && num >= 1 && num <= 31){
      const formatearDia = num < 10? `0${num}` : `${num}`;
      setDiaTarjeta(formatearDia);
    } else {
      setDiaTarjeta('');
      Alert.alert('Error', 'Por favor ingresa el día de la tarjeta.')
      return
    }
  }

  const handleMesBlur = () => {
    const num = parseInt(mesTarjeta, 10);
    if(!isNaN(num) && num >= 1 && num <= 12){
      const formatearMes = num < 10? `0${num}` : `${num}`;
      setMesTarjeta(formatearMes);
    } else {
      setMesTarjeta('');
      Alert.alert('Error', 'Por favor ingresa el mes de la tarjeta.')
      return
    }
  }

  const InfoAlerta = () => {
    Alert.alert('¿Qué es CVV?', 'El CVV es un código de seguridad que se encuentra al reverso de la tarjeta', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);
  };


  return (
    <View style={styles.fondoView2}>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Carrito')}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
          <Text style={styles.tituloMenusOptica}>Datos de Compra</Text>
        </TouchableOpacity>
      </View>

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

      <ScrollView style={styles.fondoView}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 20 }}>Total: ${totalPrice}</Text>

        <View style={styles.textReceta}>
          <View style={styles.contenedorIcon1}>
            <View style={styles.containerIcon}>
              <Text style={styles.numeroIcon}>1</Text>
            </View>
          </View>
          <Text style={{ marginLeft: 2, fontSize: 18 }}>Información del Recibidor</Text>
        </View>
        <View>
          <TextInput
            style={styles.itemDireccionCli}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />

          <View style={styles.telefonoContainer}>
            <Text style={styles.telefonoIdi}>+56</Text>
            <TextInput style={styles.telefono}
              placeholder='Teléfono'
              value={phone}
              maxLength={9}
              onChangeText={setPhone}
              keyboardType='numeric'
            />
          </View>
        </View>

        <View style={styles.textReceta}>
          <View style={styles.contenedorIcon1}>
            <View style={styles.containerIcon}>
              <Text style={styles.numeroIcon}>2</Text>
            </View>
          </View>
          <Text style={{ marginLeft: 2, fontSize: 18 }}>Dirección de envío</Text>
        </View>

        <View>
          <TextInput
            style={styles.itemDireccionCli}
            placeholder="Dirección de entrega"
            value={address}
            onChangeText={setAddress}
          />

          <RNPinckerSelect
            style={{ inputAndroid: styles.itemDireccionCli }}
            onValueChange={(value) => setSelecionarComuna(value)}
            items={comuna}
            placeholder={{ label: 'Selecciona una comuna', value: null }}
          />

          <RNPinckerSelect
            style={{ inputAndroid: styles.itemDireccionCli }}
            onValueChange={(value) => setSelecionarCiudad(value)}
            items={ciudad}
            placeholder={{ label: 'Selecciona una ciudad', value: null }}
          />
        </View>

        <View style={styles.textReceta}>
          <View style={styles.contenedorIcon1}>
            <View style={styles.containerIcon}>
              <Text style={styles.numeroIcon}>3</Text>
            </View>
          </View>
          <Text style={{ marginLeft: 2, fontSize: 18 }}>Método de Pago</Text>
        </View>

        <View style={styles.contenedorPagoCli1}>
          <TextInput
            style={styles.itemPagoCli1}
            placeholder='Nombre Titular'
            value={nombreTarjeta}
            onChangeText={setNombreTarjeta}
          />
          <TextInput style={styles.itemPagoCli1}
            placeholder='Número Terjeta'
            value={numeroTarjeta}
            maxLength={16}
            onChangeText={setNumeroTarjeta}
            keyboardType='numeric'
          />
        </View>

        <View style={styles.contenedorPagoCli2}>
          <TextInput style={styles.itemPagoCli2}
            placeholder='Día'
            value={diaTarjeta}
            maxLength={2}
            onChangeText={setDiaTarjeta}
            onBlur={handleDiaBlur}
            keyboardType='numeric'
          />
          <TextInput style={styles.itemPagoCli2}
            placeholder='Mes'
            value={mesTarjeta}
            maxLength={2}
            onChangeText={setMesTarjeta}
            onBlur={handleMesBlur}
            keyboardType='numeric'
          />
          <View style={styles.contenedorCvv}>
            <TextInput style={styles.itemPagoCli2}
              placeholder='CVV'
              value={cvvTarjeta}
              maxLength={3}
              onChangeText={setCvvTarjeta}
              keyboardType='numeric'
            />
            <TouchableOpacity onPress={InfoAlerta} style={styles.infoPago}>
              <Ionicons name="information-circle-outline" size={40} color="#FA7929" />
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={[styles.button, { alignContent: 'center', justifyContent: 'center', marginLeft: 80, marginBottom: 50}]} onPress={() => { confirmOrder(); navigation.navigate('MainTabs'); }} >
          <Text style={styles.buttonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DatosCompra;
