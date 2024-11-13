import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import styles2 from '../styles/styles2';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs, query, DocumentData, where } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; 

type RootStackParamList = { Usuario: undefined; Buscar: undefined; Carrito: undefined; Home: undefined; ProductoCliente: undefined;};
type UserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Usuario'>;
type UserScreenRouteProp = RouteProp<RootStackParamList, 'Usuario'>;
type Props = { navigation: UserScreenNavigationProp; route: UserScreenRouteProp; };

interface SliderData { name: string; imageURL: string; }
interface ProductoData {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
}

export default function UserScreen({ navigation }: Props) {
  const [sliderList, setSliderList] = useState<SliderData[]>([]);
  const [userName, setUserName] = useState<string>('Usuario'); // Esto es para sacar el nombre del usuario de la base de datos. Ojo.
  const [productoList, setProductoList] = useState<ProductoData[]>([]);

  useEffect(() => {
    GetSliderList();
    fetchUserName();
    GetProductoList();
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

  const GetProductoList = async () => {
    setProductoList([]);
    try {
      const q = query(collection(db, 'productos'));
      const querySnapshot = await getDocs(q);
      const productos: ProductoData[] = [];
      querySnapshot.forEach((doc) => {
        productos.push(doc.data() as ProductoData);
      });
      setProductoList(productos);
    } catch (error) {
      console.error("Error fetching producto data: ", error);
    }
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 20 , height: 'auto' }}>
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
          showsHorizontalScrollIndicator={false}
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

      <View>
        <FlatList
          data={productoList}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          renderItem={({ item, index }) => {
            const isLastItem = index === productoList.length - 1;
            const isOdd = productoList.length % 2 !== 0;
            return (
              <View style={[styles.productoContainer, isLastItem && isOdd ? styles.singleColumnItem : {}]}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductoCliente')}>
                  <Image
                    source={{ uri: item.imagenURL }}
                    style={styles2.productImage}
                  />
                  <Text style={styles2.productTitle}>{item.nombre}</Text>
                  <Text>{item.categoria}</Text>
                  <Text style={styles2.productPrice}>${item.precio}</Text>

                </TouchableOpacity>

              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
}
