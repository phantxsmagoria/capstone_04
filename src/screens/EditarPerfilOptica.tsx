import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import styles from '../styles/styles';

type RootStackParamList = {
  EditarPerfilOptica: undefined;
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
    <View style={[styles.container, styles.fondoView]}>
      <Text style={[styles.titleRegisterClienteNatural, { marginLeft: 20 }]}>Editar perfil de óptica</Text>
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
  );
}
