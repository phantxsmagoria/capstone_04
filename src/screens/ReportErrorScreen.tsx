import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
  ReportErrorScreen: undefined;
  Perfil: undefined;
};

type ReportErrorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReportErrorScreen'>;
type ReportErrorScreenRouteProp = RouteProp<RootStackParamList, 'ReportErrorScreen'>;

type Props = {
  navigation: ReportErrorScreenNavigationProp;
  route: ReportErrorScreenRouteProp;
};

const ReportErrorScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState<string>('');
  const [reportedBy, setReportedBy] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async () => {
    if (!title.trim() || !reportedBy.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    try {
      await addDoc(collection(db, 'errorReports'), {
        title,
        reportedBy,
        description,
        timestamp: new Date(),
      });
      Alert.alert('Guardado con Éxito', 'Su reporte ha sido guardado con éxito.');
      navigation.goBack();
    } catch (error) {
      console.error('Error submitting error report: ', error);
      Alert.alert('Error', 'Failed to submit error report.');
    }
  };

  return (
    <View style={styles.fondoView}>

      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Perfil')}>
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
  );
};

export default ReportErrorScreen;
