import { View, Text, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

type RootStackParamList = {
  RecetaScreen: undefined;
  Perfil: undefined;
}
type RecetaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecetaScreen'>;
type RecetaScreenRouterProp = RouteProp<RootStackParamList, 'RecetaScreen'>;
type Props = { navigation: RecetaScreenNavigationProp; route: RecetaScreenRouterProp; }

export default function RecetaScreen({ navigation }: Props) {
  const [ODesfera, setOdEsfera] = useState('');
  const [ODcilindro, setOdCilindro] = useState('');
  const [ODeje, setOdEje] = useState('');
  const [OIesfera, setOiEsfera] = useState('');
  const [OIcilindro, setOiCilindro] = useState('');
  const [OIeje, setOiEje] = useState('');
  const [adicion, setAdicion] = useState('');
  const [distanciapupilar, setDistanciaPupilar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [cargandoinfo, setCargandoInfo] = useState(true);
  const [modificarinfo, setModificarInfo] = useState(false);

  const usuarioId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchDatosReceta = async () => {
      try {
        const docRef = doc(db, 'receta', usuarioId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setOdEsfera(data?.ODesfera || '');
          setOdCilindro(data?.ODcilindro || '');
          setOdEje(data?.ODeje || '');
          setOiEsfera(data?.ODesfera || '');
          setOiCilindro(data?.OIcilindro || '');
          setOiEje(data?.OIeje || '');
          setAdicion(data?.adicion || '');
          setDistanciaPupilar(data?.distanciapupilar || '');
          setModificarInfo(true); // esto es si el usuario ya tiene datos lo pueda modificar
        }
      } catch (error) {
        console.error('Error obteniendo los datos: ', error);
      } finally {
        setCargandoInfo(false);
      }
    };
    if (usuarioId) {
      fetchDatosReceta();
    }
  }, [usuarioId]);


  //Este const es para que solo puedan ingresar datos decimales separados por un punto, además de los "+" y "-"*/ 
  const validateDatosReceta = (text: string) => {
    const regex = /^[-+]?\d*\.?\d*$/;
    return regex.test(text) && text.length <= 5;

  };

  //Este const es para mostrar que está cargando la pagina
  if (cargandoinfo) {
    return <ActivityIndicator size='large' color='#fa7929' style={styles.cargardatosreceta} />
  };

  const handleReceta = async () => {
    setErrorMessage(''); // Resetear mensaje de error
    setSuccessMessage('');// Resetear mensaje de éxito

    if (!ODesfera || !OIesfera) {
      setErrorMessage('Los campos "ESF / SPH" son obligatorios');
      return;
    }


    try {
      const docRef = doc(db, 'receta', usuarioId!);
      await setDoc(docRef, {
        ODesfera,
        ODcilindro,
        ODeje,
        OIesfera,
        OIcilindro,
        OIeje,
        adicion,
        distanciapupilar,
        usuarioId,
      });
      if (!modificarinfo) {
        setSuccessMessage('Se ha guardado su receta con éxito');
        setModificarInfo(true);
      }
      else {
        setSuccessMessage('Se ha modificado su receta con éxito');
      }
    } catch (error) {
      console.error('Error creando receta: ', error);
      setErrorMessage('Error al crear su receta');
    }
  };
  return (
    <View>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Perfil')}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> 
          <Text style={{ fontSize: 30 }}>Mi Receta</Text> 
        </TouchableOpacity>
      </View>
      <View style={styles.textReceta} >
        <Text style={{ marginLeft: 15, fontSize: 18 }}>OD: Ojo Derecho</Text>
        <Ionicons name="information-circle-outline" size={30} color="#FA7929" />
      </View>

      <View style={styles.contenedorReceta}>
        <TextInput style={styles.itemReceta}
          placeholder='ESF / SPH'
          value={ODesfera}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setOdEsfera(text); }}
        />

        <TextInput style={styles.itemReceta}
          placeholder='CLI / CYL'
          value={ODcilindro}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setOdCilindro(text); }}
        />

        <TextInput style={styles.itemReceta}
          placeholder='EJE'
          value={ODeje}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setOdEje(text); }}
        />
      </View>

      <View style={styles.textReceta}>
        <Text style={{ marginLeft: 15, fontSize: 18 }}>OI: Ojo Izquierdo</Text>
        <Ionicons name="information-circle-outline" size={30} color="#FA7929" />
      </View>
      <View style={styles.contenedorReceta}>

        <TextInput style={styles.itemReceta}
          placeholder='ESF / SPH'
          value={OIesfera}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setOiEsfera(text); }}
        />

        <TextInput style={styles.itemReceta}
          placeholder='CLI / CYL'
          value={OIcilindro}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setOiCilindro(text); }}
        />

        <TextInput style={styles.itemReceta}
          placeholder='EJE'
          value={OIeje}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setOiEje(text); }}
        />

      </View>
      <View>
        <Ionicons style={{ marginLeft: 15, marginTop: 10, marginBottom: -8 }} name="information-circle-outline" size={30} color="#FA7929" />
      </View>
      <View style={styles.contendorReceta2}>
        <TextInput style={styles.itemReceta2}
          placeholder='ADD'
          value={adicion}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setAdicion(text); }}
        />

        <TextInput style={styles.itemReceta2}
          placeholder='DP'
          value={distanciapupilar}
          editable={true}
          onChangeText={(text) => { if (validateDatosReceta(text)) setDistanciaPupilar(text); }}
        />
      </View>
      <View>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
        <TouchableOpacity style={styles.botonReceta} onPress={handleReceta}>
          <Text style={styles.botonTextReceta}>{modificarinfo ? 'Modificar Receta' : 'Guardar Receta'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}