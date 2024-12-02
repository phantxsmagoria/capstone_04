import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import styles from '../styles/styles';

type RootStackParamList = {
  OpticaReseña: undefined;
  OpticaScreen: undefined;
};

type OpticaReseñaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OpticaReseña'>;
type OpticaReseñaScreenRouterProp = RouteProp<RootStackParamList, 'OpticaReseña'>;
type Props = { navigation: OpticaReseñaScreenNavigationProp; route: OpticaReseñaScreenRouterProp };

type ReviewData = {
  id: string;
  productoId: string;
  descripcion: string;
  rating: number;
  enviadoPor: string;
  fecha: string;
  productoNombre: string;
  productoImagenURL: string;
};

const OpticaReseña: React.FC<Props> = ({ navigation }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [cargandoReseñas, setCargandoReseñas] = useState(true);

  const fetchReseñas = async () => {
    try {
      const userEmail = auth.currentUser?.email;
      console.log('Usuario Email:', userEmail); // Verificar el correo electrónico del usuario
      if (!userEmail) return;

      const q = query(collection(db, 'reviews'), where('opticaEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);
      console.log('QuerySnapshot Size:', querySnapshot.size); // Verificar el tamaño del QuerySnapshot

      const reviewsList: ReviewData[] = [];
      for (const docSnap of querySnapshot.docs) {
        const data = docSnap.data();
        console.log('Datos de la Reseña:', data); // Verificar los datos de la reseña
        const productoDoc = await getDoc(doc(db, 'productos', data.productoId));
        if (productoDoc.exists()) {
          const productoData = productoDoc.data();
          reviewsList.push({
            id: docSnap.id,
            productoNombre: productoData.nombre,
            productoImagenURL: productoData.imagenURL,
            ...data,
          } as ReviewData);
        } else {
          console.warn('Producto no encontrado para la reseña:', docSnap.id);
        }
      }
      console.log('Reviews List:', reviewsList); // Verificar la lista de reseñas obtenidas
      setReviews(reviewsList);
    } catch (error) {
      console.error('Error fetching reviews: ', error);
    } finally {
      setCargandoReseñas(false);
    }
  };

  useEffect(() => {
    fetchReseñas();
  }, []);

  const onRefresh = async () => {
    setCargandoReseñas(true);
    await fetchReseñas();
    setCargandoReseñas(false);
  };

  const renderReseña = ({ item }: { item: ReviewData }) => (
    <View style={styles.reseñaContainer}>
      <Image source={{ uri: item.productoImagenURL }} style={styles.productImage} />
      <Text style={styles.reseñaTitle}>{item.productoNombre}</Text>
      <Text>{item.descripcion}</Text>
      <View style={styles.ratingContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <MaterialIcons
            key={index}
            name={index < item.rating ? 'star' : 'star-outline'}
            size={24}
            color="#FA7929"
          />
        ))}
      </View>
      <Text>{item.fecha}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
        <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" />
        <Text style={styles.tituloMenusOptica}>Reseñas</Text>
      </TouchableOpacity>

      {reviews.length === 0 ? (
        <View style={styles.imagenOpticaContainer}>
          <Image source={require('../assets/ReseñaOptica.png')} style={{ width: 300, height: 300 }} />
          <Text style={styles.textoOptica}>No hay reseñas existentes</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReseña}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={cargandoReseñas} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default OpticaReseña;
