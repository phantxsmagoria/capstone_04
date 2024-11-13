import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';

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
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la Óptica:</Text>
      <TextInput
        style={styles.input}
        value={nombreOptica}
        onChangeText={setNombreOptica}
      />
      <Text style={styles.label}>Nueva Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Guardar Cambios" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
});
