import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import styles2 from '../styles/styles2';

type RootStackParamList = {
  ReseñasClienteScreen: undefined;
  SubirReseñaScreen: undefined;
  AgregarReseñaScreen: { productId: string };
  Perfil: undefined;
  ReseñaProductoScreen: undefined;
};

type ReseñasClienteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReseñasClienteScreen'>;
type ReseñasClienteScreenRouteProp = RouteProp<RootStackParamList, 'ReseñasClienteScreen'>;

type Props = {
  navigation: ReseñasClienteScreenNavigationProp;
  route: ReseñasClienteScreenRouteProp;
};

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

const ReseñasClienteScreen: React.FC<Props> = ({ navigation }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [cargandoReseñas, setCargandoReseñas] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchReseñas = async () => {
      try {
        const userEmail = auth.currentUser?.email;
        if (!userEmail) return;

        const q = query(collection(db, 'reviews'), where('enviadoPor', '==', userEmail));
        const querySnapshot = await getDocs(q);

        const reviewsList: ReviewData[] = [];
        for (const docSnap of querySnapshot.docs) {
          const data = docSnap.data();
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
        setReviews(reviewsList);
      } catch (error) {
        console.error('Error fetching reviews: ', error);
      } finally {
        setCargandoReseñas(false);
      }
    };

    fetchReseñas();
  }, []);

  const filteredReviews = reviews.filter(review =>
    review.productoNombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderReseña = ({ item }: { item: ReviewData }) => (
    <View style={styles.reseñaContainer}>
      <Image source={{ uri: item.productoImagenURL }} style={styles2.productImage} />
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
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('AgregarReseñaScreen', { productId: item.productoId })}
      >
        <Text style={styles.editButtonText}>Editar Reseña</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={filteredReviews}
        ListHeaderComponent={
          <View style={{ padding: 20, marginTop: 20 }}>
            <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Perfil')}>
                <MaterialIcons name="arrow-back-ios" size={25} color="#FA7929" />
              <Text style={styles.tituloMenusOptica}>Mis Reseñas</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Tus Reseñas</Text>

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
              
            </View>
          </View>
        }
        renderItem={renderReseña}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Image source={require('../assets/ReseñaOptica.png')} style={styles.emptyImage} />
            <Text style={styles.emptyText}>No tienes reseñas creadas.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ReseñasClienteScreen;
