import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { db, auth } from '../firebaseConfig';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import styles from '../styles/styles';

type RootStackParamList = {
  EditarPerfilCliente: undefined;
};

type EditarPerfilClienteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarPerfilCliente'>;
type EditarPerfilClienteScreenRouteProp = RouteProp<RootStackParamList, 'EditarPerfilCliente'>;

interface Props {
  navigation: EditarPerfilClienteScreenNavigationProp;
  route: EditarPerfilClienteScreenRouteProp;
}

export default function EditarPerfilClienteScreen({ navigation }: Props) {
  const [nombreCliente, setNombreCliente] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      console.log("Current User UID: ", user.uid); // Log del UID del usuario, se supone que aquí encuentra el UID del usuario, revisa esto porfis canelita
      try {
        const clienteDocRef = doc(db, 'users', user.uid);
        console.log("Fetching document for UID: ", user.uid); 

        const docSnap = await getDoc(clienteDocRef);

        if (docSnap.exists()) {
          console.log("Document data: ", docSnap.data()); // Aquí se supone que ya lo obtiene y por consola también lo muestra

            //aquí están los sets
          console.log("Updating nombreCliente: ", nombreCliente); // Log del nombre a actualizar
          await updateDoc(clienteDocRef, { nombreCliente });

          // Y aquí para cambiar la pass
          if (password) {
            console.log("Updating password"); 
            await updatePassword(user, password);
          }

          navigation.goBack();
        } else {
          console.error("No se encontró el documento del usuario");
        }
      } catch (error) {
        console.error("Error updating profile", error);
      }
    } else {
      console.error("No current user found");
    }
  };

  return (
    <View style={[styles.fondoView, styles.container]}>
      <Text style={[styles.titleRegisterClienteNatural, { marginLeft: 20 }]}>Editar perfil</Text>
      
      <TextInput
        placeholder="Nombre"
        style={styles.inputLine}
        value={nombreCliente}
        onChangeText={setNombreCliente}
      />
      
      <TextInput
        placeholder="Contraseña"
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
