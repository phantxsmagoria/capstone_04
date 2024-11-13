import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, DocumentData, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; 

type RootStackParamList = { Usuario: undefined; Buscar: undefined; Carrito: undefined; Home: undefined; };
type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Usuario'>;
type UserScreenRouteProp = RouteProp<RootStackParamList, 'Usuario'>;
type Props = { navigation: UserScreenNavigationProp; route: UserScreenRouteProp; };

interface SliderData { name: string; imageURL: string; }

export default function UserScreen({ navigation }: Props) {
  const [sliderList, setSliderList] = useState<SliderData[]>([]);
  const [userName, setUserName] = useState<string>('Usuario'); // Esto es para sacar el nombre del usuario de la base de datos. Ojo.

  useEffect(() => {
    GetSliderList();
    fetchUserName();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    try {
      const q = query(collection(db, 'sliders'));
      const querySnapshot = await getDocs(q);
      const sliders: SliderData[] = [];
      querySnapshot.forEach((doc) => {
        sliders.push(doc.data() as SliderData);
      });
      setSliderList(sliders);
    } catch (error) {
      console.error("Error fetching slider data: ", error);
    }
  };

  const fetchUserName = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const q = query(collection(db, 'users'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserName(userData.name);
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    } else {
      console.error("No user is logged in");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontSize: 20 }}>Hola,</Text>
      <Text style={{ fontSize: 20 }}>{userName}</Text> 

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#FA7929',
        padding: 10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 10,
      }}>
        <Ionicons name="search" size={24} color="white" />
        <TextInput placeholder='Buscador' style={{ color: '#ffff', fontSize: 16 }} />
      </View>

      <View>
        <FlatList
          data={sliderList}
          horizontal={true}
          style={{ paddingLeft: 20 }}
          renderItem={({ item, index }) =>
            <Image
              source={{ uri: item.imageURL }}
              style={{
                width: 300,
                height: 160,
                borderRadius: 15,
                marginRight: 20,
                marginTop: 10,
              }}
            />
          }
        />
      </View>
    </View>
  );
}
