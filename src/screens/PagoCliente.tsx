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
};

type PagoClienteNavigationProp = StackNavigationProp<RootStackParamList, 'Pago'>;
type PagoClienteRouteProp = RouteProp<RootStackParamList, 'Pago'>;

type Props = {
  navigation: PagoClienteNavigationProp;
  route: PagoClienteRouteProp;
};


const PagoCliente: React.FC<Props> = ({ navigation }) => {
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

  const handlePago = async () => {
    if (!nombreTarjeta || !numeroTarjeta || !diaTarjeta || !mesTarjeta || !cvvTarjeta) {
      Alert.alert('Error', 'Por favor ingresa los datos solicitados');
      return;
    }

    if (!validarNombreTarjeta(nombreTarjeta)) {
      setErrorMessageTarjeta('No se puede ingresar número o caracteres especiales');
      return;
    }

    if (numeroTarjeta.length !== 16) {
      setErrorMessageTarjeta('Se deben ingresar 16 números');
      return;
    }

    if (diaTarjeta.length !== 2) {
      setErrorMessageTarjeta('Se debe ingresar máximo dos dígitos');
      return;
    }

    if (mesTarjeta.length !== 2) {
      setErrorMessageTarjeta('Se debe ingresar máximo dos dígitos');
      return;
    }

    if (cvvTarjeta.length < 3 || cvvTarjeta.length > 4) {
      setErrorMessageTarjeta('Dependiendo de tu tarjeta, se pueden ingresar de 3 a 4 dígitos');
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
      Alert.alert('Éxito', 'Se ha realizado su pago con éxito.');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al crear su boleta.');
      console.error('Error con su boleta: ', error);
    }
  };

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
          <Text style={styles.tituloMenusOptica}>Pago</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textPago}>
        <FontAwesome name="credit-card" size={22} color="black" style={styles.iconPago} />
        <Text style={styles.textPagoCli}>Añadir Tarjeta de Débito / Crédito</Text>
      </View>

      <View style={styles.contenedorPagoCli1}>
        <TextInput
          style={styles.itemPagoCli1}
          placeholder='Nombre Titular'
          value={nombreTarjeta}
          onChangeText={setNombreTarjeta}
        />
        <TextInput
          style={styles.itemPagoCli1}
          placeholder='Número Tarjeta'
          value={numeroTarjeta}
          onChangeText={(numT) => {
            const sanitized = numT.replace(/[^0-9]/g, '');
            setNumeroTarjeta(sanitized);
          }}
          keyboardType="numeric"
          maxLength={16}
        />
      </View>

      <View style={styles.contenedorPagoCli2}>
        <TextInput
          style={styles.itemPagoCli2}
          placeholder='Día'
          value={diaTarjeta}
          onChangeText={(diaT) => {
            const sanitized = diaT.replace(/[^0-9]/g, '');
            setDiaTarjeta(sanitized);
          }}
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={styles.itemPagoCli2}
          placeholder='Mes'
          value={mesTarjeta}
          onChangeText={(mesT) => {
            const sanitized = mesT.replace(/[^0-9]/g, '');
            setMesTarjeta(sanitized);
          }}
          keyboardType="numeric"
          maxLength={2}
        />
        <View style={styles.contenedorCvv}>
          <TextInput
            style={styles.itemPagoCli2}
            placeholder='CVV'
            value={cvvTarjeta}
            onChangeText={(cvvT) => {
              const sanitized = cvvT.replace(/[^0-9]/g, '');
              setCvvTarjeta(sanitized);
            }}
            keyboardType="numeric"
            maxLength={4}
          />
          <TouchableOpacity onPress={InfoAlerta} style={styles.infoPago}>
            <Ionicons name="information-circle-outline" size={40} color="#FA7929" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.fondoView}>
        <TouchableOpacity
          style={[styles.button, { alignContent: 'center', justifyContent: 'center', marginLeft: 80 }]}
          onPress={handlePago}
        >
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PagoCliente;
