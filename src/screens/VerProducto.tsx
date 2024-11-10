import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList = {
  VerProducto: undefined;
  ProductoOptica: undefined;
  OpticaScreen: undefined;
};
type VerProductoNavigationProp = StackNavigationProp<RootStackParamList, 'VerProducto'>;
type VerProductoRouteProp = RouteProp<RootStackParamList, 'VerProducto'>;
type Props = { navigation: VerProductoNavigationProp; route: VerProductoRouteProp; };

interface ProductoData {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenURL: string;
  categoria: string;
}

export default function VerProducto({ navigation }: Props) {
  const [productoList, setProductoList] = useState<ProductoData[]>([]);

  useEffect(() => {
    GetProductoList();
  }, []);

  const GetProductoList = async () => {
    setProductoList([]);
    try {
      const q = query(collection(db, 'productos'));
      const querySnapshot = await getDocs(q);
      const productos: ProductoData[] = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        productos.push(doc.data() as ProductoData);
      });
      setProductoList(productos);
    } catch (error) {
      console.error("Error fetching producto data: ", error);
    }
  };

  return (
    <View>
      {/*este es para el botón para regresar atrás*/}
      <TouchableOpacity style={styles.nomProfile } onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" /> {/* acá modifique el tamaño por 35*/}
        <Text style={{ fontSize: 30 }}>Mi Catálogo</Text> {/* acá modifique el tamaño por 30*/}
      </TouchableOpacity>
      {/*este es para el botón para ir a la página de Producto Optica*/}
      <TouchableOpacity style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
      }} onPress={() => navigation.navigate('ProductoOptica')}>
        <MaterialIcons name="create" size={24} color="black" />
        <Text>Crear Nuevo Producto</Text>
      </TouchableOpacity>



      <FlatList
        data={productoList}
        style={{ flex: 1}}
        renderItem={({ item, index }) => (
          <View key={index} style={{ padding: 20, flex: 1, flexGrow: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>{item.nombre}</Text>
            <Text
              style={{
                fontSize: 14,
              }}>{item.descripcion}</Text>
            <Text
              style={{
                fontSize: 14,
                color: 'green',
              }}>{item.precio}</Text>
            <Text
              style={{
                fontSize: 14,
                color: 'gray',
              }}>{item.categoria}</Text>
            <Image
              source={{ uri: item.imagenURL }}
              style={{
                width: 300,
                height: 160,
                borderRadius: 15,
                marginTop: 10,
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}

      />
    </View>
  );

}


