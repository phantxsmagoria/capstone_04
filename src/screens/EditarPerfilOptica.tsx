import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
  EditarPerfilOptica: undefined;
  OpticaScreen: undefined;
};

type EditarPerfilOpticaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarPerfilOptica'>;
type EditarPerfilOpticaScreenRouteProp = RouteProp<RootStackParamList, 'EditarPerfilOptica'>;

type Props = {
  navigation: EditarPerfilOpticaScreenNavigationProp;
  route: EditarPerfilOpticaScreenRouteProp;
};

export default function EditarPerfilOpticaScreen({ navigation }: Props) {
  const [nombreOptica, setNombreOptica] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        // Update nombreOptica
        const opticaDoc = doc(db, 'opticas', user.uid);
        await updateDoc(opticaDoc, { nombreOptica });

        // Update password
        await updatePassword(user, password);

        navigation.goBack();
      } catch (error) {
        console.error("Error updating profile", error);
      }
    }
  };

  return (
    <View style={ styles.fondoView}>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
          <Text style={styles.tituloMenusOptica}>Editar perfil de óptica</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.imagenOpticaContainerEdit}>
        <Image source={require('../assets/OpticaEditPerfil.png')} style={{ width: 250, height: 250 }} />
      </View>
      
      <View style={styles.containerEdit}>
      <TextInput
        placeholder='Nuevo nombre óptica'
        style={styles.inputLine}
        value={nombreOptica}
        onChangeText={setNombreOptica}
      />
      <TextInput
        placeholder='Nueva contraseña'
        style={styles.inputLine}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
