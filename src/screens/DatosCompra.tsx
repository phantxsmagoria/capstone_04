import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList , ScrollView} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RNPinckerSelect from 'react-native-picker-select';

type RootStackParamList = {
  Pago: undefined;
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

  const confirmOrder = async () => {
    if (name.trim() === '' || address.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre y una dirección de entrega');
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


  return (
    <View style={styles.fondoView2}>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Pago')}>
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

        <TouchableOpacity style={[styles.button, { alignContent: 'center', justifyContent: 'center', marginLeft: 80 }]} onPress={() => { confirmOrder(); navigation.navigate('MainTabs'); }} >

          <Text style={styles.buttonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default DatosCompra;
