import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, TextInput, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles'
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';

type RootStackParamList = {
  Usuario: undefined;
  Buscar: undefined;
  Carrito: undefined;
  Home: undefined;
};

type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Usuario'>;
type UserScreenRouteProp = RouteProp<RootStackParamList, 'Usuario'>;

type Props = {
  navigation: UserScreenNavigationProp;
  route: UserScreenRouteProp;
};

interface SliderData {
  name: string;
  imageURL: string;
}

export default function UserScreen({ navigation }: Props) {
  const [sliderList, setSliderList] = useState<any[]>([]);
  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    setSliderList([]);
    try {
      const q = query(collection(db, 'sliders'));
      const querySnapshot = await getDocs(q);
      const sliders: any[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        sliders.push(doc.data());
      });
      setSliderList(sliders);
    } catch (error) {
      console.error("Error fetching slider data: ", error);
    }
  };
  return (
<View>
      <View style={{ padding: 20, marginTop: 20}}>
        {/* Información del usuario*/}
        <View>
          <Text style={{ fontSize: 20 }}>Hola,</Text>
          <Text style={{ fontSize: 20 }}>Usuario</Text>
        </View>
        {/* Buscador */}
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
        {/*Slider*/}
        <View>
          <FlatList
            data={sliderList}
            horizontal={true}
            style={{paddingLeft:20}}
            renderItem={({ item, index }) =>
              <Image source={{ uri: item.imageURL }}
                style={{
                  width: 300,
                  height: 160,
                  borderRadius:15,
                  marginRight:20,
                  marginTop:10,
                }}
              />}
          />
        </View>
      </View>




    </View>
  );
}
{/*
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Button
        title="Ir a Buscar"
        onPress={() => navigation.navigate('Buscar')}
      />
      <Button
        title="Ir al Carrito"
        onPress={() => navigation.navigate('Carrito')}
      />
      <Button
        title="Ir al Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>*/}
