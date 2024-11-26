import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
    OpticaNotificarError: undefined;
    OpticaScreen: undefined;
}

type OpticaNotificarErrorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpticaNotificarError'>;
type OpticaNotificarErrorScreenRouteProp = RouteProp<RootStackParamList, 'OpticaNotificarError'>;

type Props = {
  navigation: OpticaNotificarErrorScreenNavigationProp;
  route: OpticaNotificarErrorScreenRouteProp;
};


export default function OpticaNotificarError({navigation}: Props) {
    const [title, setTitle] = useState<string>('');
    const [reportedBy, setReportedBy] = useState<string>('');
    const [description, setDescription] = useState<string>('');
  
    const handleSubmit = async () => {
      if (!title.trim() || !reportedBy.trim() || !description.trim()) {
        Alert.alert('Error', 'Por favor, complete todos los campos.');
        return;
      }
  
      try {
        await addDoc(collection(db, 'errorReportOptica'), {
          title,
          reportedBy,
          description,
          timestamp: new Date(),
        });
        Alert.alert('Guardado con Éxito', 'Su reporte ha sido guardado con éxito.');
        navigation.goBack();
      } catch (error) {
        console.error('Error al enviar el reporte: ', error);
        Alert.alert('Error', 'No se ha podido enviar su reporte con éxito.');
      }
    };
  
    return (
      <View style={styles.fondoView}>
  
        <View>
          <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
            <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
            <Text style={styles.tituloMenusOptica}>Notificar error</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imagenOpticaContainerEdit}>
          <Image source={require('../assets/ReportError.png')} style={{ width: 300, height: 300 }} />
        </View>
        <View style={styles.containerEdit}>
          <TextInput
            style={styles.inputLine}
            placeholder="Titulo"
            value={title}
            onChangeText={setTitle}
          />
  
          <TextInput
            style={styles.inputLine}
            placeholder="Reportado Por"
            value={reportedBy}
            onChangeText={setReportedBy}
          />
  
          <TextInput
            style={styles.inputLine}
            placeholder="Descripcion"
            value={description}
            onChangeText={setDescription}
          />
  
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar Reporte</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}