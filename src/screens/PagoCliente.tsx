import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { collection, addDoc, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

type RootStackParamList = {
  Pago: undefined;
  DatosCompra: undefined;
  Carrito: undefined,
  MainTabs: undefined;
  DireccionCliente: undefined;
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
  const [nombreTarjeta, setNombreTarjeta] = useState('');
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [diaTarjeta, setDiaTarjeta] = useState('');
  const [mesTarjeta, setMesTarjeta] = useState('');
  const [cvvTarjeta, setCvvTarjeta] = useState('');
  const [errorMessageTarjeta, setErrorMessageTarjeta] = useState('');

  const usuarioId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchDatosTarjeta = async () => {
      try {
        const docRef = doc(db, 'datospagocliente', usuarioId!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreTarjeta(data?.nombreTarjeta || '');
          setNumeroTarjeta(data?.numeroTarjeta || '');
          setDiaTarjeta(data?.diaTarjeta || '');
          setMesTarjeta(data?.mesTarjeta || '');
          setCvvTarjeta(data?.cvvTarjeta || '');
        }
      } catch (error) {
        console.error('Error obteniendo los datos: ', error)
      }
    };
    if (usuarioId) {
      fetchDatosTarjeta();
    }
  }, [usuarioId]);

  const validarNombreTarjeta = (nomT: string): boolean => /^[a-zA-Z\s]+$/.test(nomT);
  const validarNumeroTarjeta = (numT: string): boolean => /^[0-9]{16}$/.test(numT);
  const validarDiaTarjeta = (diaT: string): boolean => /^[0-9]{2}$/.test(diaT);
  const validarMesTarjeta = (mesT: string): boolean => /^[0-9]{2}$/.test(mesT);
  const validarCvvTarjeta = (cvvT: string): boolean => /^[0-9]{4}$/.test(cvvT);


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

  const handlePago = async () => {
    if (!nombreTarjeta || !numeroTarjeta || !diaTarjeta || !mesTarjeta || !cvvTarjeta) {
      Alert.alert('Error', 'Por favor ingresa los datos solicitados');
      return;
    }

    if (!validarNombreTarjeta(nombreTarjeta)) {
      setErrorMessageTarjeta('No se puede ingresar número o carácteres especiales');
      return;
    }

    if (!validarNumeroTarjeta(numeroTarjeta)) {
      setErrorMessageTarjeta('Se deben de ingresar los 16 números');
      return;
    }
    if (!validarDiaTarjeta(diaTarjeta)) {
      setErrorMessageTarjeta('Se debe ingresar máximo dos digitos');
      return;
    }
    if (!validarMesTarjeta(mesTarjeta)) {
      setErrorMessageTarjeta('Se debe ingresar máximo dos digitos');
      return;
    }
    if (!validarCvvTarjeta(cvvTarjeta)) {
      setErrorMessageTarjeta('Dependiendo de tu tarjeta se puede ingresar máximo ente 3 a 4 digitos');
      return;
    }
    try {
      const docRef = doc(db, 'datospagocliente', usuarioId!);
      await setDoc(docRef, {
        nombreTarjeta,
        numeroTarjeta,
        diaTarjeta,
        mesTarjeta,
        cvvTarjeta,
        usuarioId,
      });
      navigation.navigate('DatosCompra');
      Alert.alert('Éxitosamente', 'Se ha realizado su pago con éxito.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear su boleta.');
      console.error('Error con su boleta: ', error);
    }
  };
  const InfoAlerta = () => {
    Alert.alert('¿Que es CVV?', 'El CVV es un código de seguridad que se encuentra al reveso de la tarjeta', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  };


  return (
    <View style={styles.fondoView2}>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('DireccionCliente')}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
          <Text style={styles.tituloMenusOptica}>Pago</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textPago} >
        <FontAwesome name="credit-card" size={22} color="black" style={styles.iconPago} />
        <Text style={styles.textPagoCli}>Añadir Tarjeta de Débito / Crédito</Text>
      </View>

      <View style={styles.contenedorPagoCli1}>
        <TextInput style={styles.itemPagoCli1}
          placeholder='Nombre Titular'
          value={nombreTarjeta}
          editable={true}
          onChangeText={(nomT) => { if (validarNombreTarjeta(nomT) || nomT === '') { setNombreTarjeta(nomT); setErrorMessageTarjeta(''); } else { setErrorMessageTarjeta('No se pueden ingresar números o letras.') } }}
        />
        <TextInput style={styles.itemPagoCli1}
          placeholder='Número Tarjeta'
          value={numeroTarjeta}
          editable={true}
          maxLength={16}
          onChangeText={(numT) => { if (validarNumeroTarjeta(numT) || numT === '') { setNumeroTarjeta(numT); setErrorMessageTarjeta(''); } else { setErrorMessageTarjeta('No se pueden ingresar letras o caracteres especiales.') } }}
        />
      </View>

      <View style={styles.contenedorPagoCli2}>
        <TextInput style={styles.itemPagoCli2}
          placeholder='Día'
          value={diaTarjeta}
          editable={true}
          maxLength={2}
          onChangeText={(diaT) => { if (validarDiaTarjeta(diaT) || diaT === '') { setDiaTarjeta(diaT); setErrorMessageTarjeta(''); } else { setErrorMessageTarjeta('Solo se pueden ingresar números de máximo 2 caracteres.') } }}
        />
        <TextInput style={styles.itemPagoCli2}
          placeholder='Mes'
          value={mesTarjeta}
          editable={true}
          maxLength={2}
          onChangeText={(mesT) => { if (validarMesTarjeta(mesT) || mesT === '') { setMesTarjeta(mesT); setErrorMessageTarjeta(''); } else { setErrorMessageTarjeta('Solo se pueden ingresar números de máximo 2 caracteres.') } }}
        />
        <View style={styles.contenedorCvv}>
          <TextInput style={styles.itemPagoCli2}
            placeholder='CVV'
            value={cvvTarjeta}
            editable={true}
            maxLength={4}
            onChangeText={(cvvT) => { if (validarCvvTarjeta(cvvT) || cvvT === '') { setCvvTarjeta(cvvT); setErrorMessageTarjeta(''); } else { setErrorMessageTarjeta('Solo se pueden ingresar números de máximo 3 a 4 caracteres, dependiendo de su tarjeta.') } }}
          />
          <TouchableOpacity onPress={InfoAlerta} style={styles.infoPago}>
            <Ionicons name="information-circle-outline" size={40} color="#FA7929" />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.fondoView}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginBottom: 20, }}>Total: ${totalPrice}</Text>

        <TouchableOpacity style={[styles.button, { alignContent: 'center', justifyContent: 'center', marginLeft: 80 }]} onPress={(handlePago)}>
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default PagoCliente;
