import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
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

export default function RecetaScreen({navigation}: Props) {
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

  {/* Este const es para que solo puedan ingresar datos decimales separados por un punto, además de los "+" y "-"*/}
  const validateDatosReceta = (text: string) => {
    const regex = /^[-+]?\d*\.?\d*$/;
    return regex.test(text) && text.length <=5;
    
  };

  const handleReceta = async () => {
    setErrorMessage(''); // Resetear mensaje de error
    setSuccessMessage('');// Resetear mensaje de éxito

    if (!ODesfera || !OIesfera) {
      setErrorMessage('Los campos "ESF / SPH" son obligatorios');
      return;
    }

    try {
      await addDoc(collection(db, 'receta'), {
        ODesfera,
        ODcilindro,
        ODeje,
        OIesfera,
        OIcilindro,
        OIeje,
        adicion,
        distanciapupilar,
        usuarioId: auth.currentUser?.uid, // Asegúrate de que el usuario está autenticado
      });
      setSuccessMessage('Se ha creado su receta con éxito');
      setOdEsfera('');
      setOdCilindro('');
      setOdEje('');
      setOiEsfera('');
      setOiCilindro('');
      setOiEje('');
      setAdicion('');
      setDistanciaPupilar('');
    } catch (error) {
      console.error('Error creando receta: ', error);
      setErrorMessage('Error al crear su receta');
    }
  };
  return (
    <View>
      {/*este es para el botón para regresar atrás*/}
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('Perfil')}>
        <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> {/* acá modifique el tamaño por 35*/}
        <Text style={{ fontSize: 30 }}>Mi Receta</Text> {/* acá modifique el tamaño por 30*/}
      </TouchableOpacity>

      {/* Este es del ojo derecho*/}
      <View style={styles.textReceta} >
      <Text style={{marginLeft: 15,fontSize: 18}}>OD: Ojo Derecho</Text>
      <Ionicons  name="information-circle-outline" size={30} color="#FA7929" />
      </View>

      <View style={styles.contenedorReceta}>  
      <TextInput style={styles.itemReceta}
        placeholder='ESF / SPH'
        value={ODesfera}
        onChangeText={(text) => {if (validateDatosReceta(text)) setOdEsfera(text);}}
      />

      <TextInput style={styles.itemReceta}
        placeholder='CLI / CYL'
        value={ODcilindro}
        onChangeText={(text) => {if (validateDatosReceta(text)) setOdCilindro(text);}}
      />

      <TextInput style={styles.itemReceta}
        placeholder='EJE'
        value={ODeje}
        onChangeText={(text) => {if (validateDatosReceta(text)) setOdEje(text);}}
      />
      </View>

      {/* Este es del ojo izquierdo*/}
      <View style={styles.textReceta}>
      <Text style={{marginLeft:15,fontSize: 18}}>OI: Ojo Izquierdo</Text>
      <Ionicons name="information-circle-outline" size={30} color="#FA7929" />
      </View>
      <View style={styles.contenedorReceta}>

      <TextInput style={styles.itemReceta}
        placeholder='ESF / SPH'
        value={OIesfera}
        onChangeText={(text) => {if (validateDatosReceta(text)) setOiEsfera(text);}}
      />

      <TextInput style={styles.itemReceta}
        placeholder='CLI / CYL'
        value={OIcilindro}
        onChangeText={(text) => {if (validateDatosReceta(text)) setOiCilindro(text);}}
      />

      <TextInput style={styles.itemReceta}
        placeholder='EJE'
        value={OIeje}
        onChangeText={(text) => {if (validateDatosReceta(text)) setOiEje(text);}}
      />

      </View>
      {/* Y esto es general*/}
      <Ionicons style={{marginLeft:15, marginTop:10, marginBottom: -8}} name="information-circle-outline" size={30} color="#FA7929" />
      <View style={styles.contendorReceta2}>
      <TextInput style={styles.itemReceta2}
        placeholder='ADD'
        value={adicion}
        onChangeText={(text) => {if (validateDatosReceta(text)) setAdicion(text);}}
      />

      <TextInput style={styles.itemReceta2}
        placeholder='DP'
        value={distanciapupilar}
        onChangeText={(text) => {if (validateDatosReceta(text)) setDistanciaPupilar(text);}}
      />
      </View>

      {/* Este es el botón para crear la receta*/}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <TouchableOpacity style={styles.botonReceta} onPress={handleReceta}>
        <Text style={styles.botonTextReceta}>Guardar Receta</Text>
      </TouchableOpacity>
    </View>
  )
}