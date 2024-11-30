    import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
    import { RouteProp } from '@react-navigation/native';
    import { StackNavigationProp } from '@react-navigation/stack';
    import { collection, getDoc, doc, addDoc } from 'firebase/firestore';
    import { db, auth } from '../firebaseConfig';
    import styles from '../styles/styles';
    import Ionicons from '@expo/vector-icons/Ionicons';

    type RootStackParamList = { 
    AgregarReseñaScreen: { productId: string }; 
    // ...otros tipos de pantallas
    };

    type AgregarReseñaScreenRouteProp = RouteProp<RootStackParamList, 'AgregarReseñaScreen'>;
    type AgregarReseñaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AgregarReseñaScreen'>;

    type Props = { 
    route: AgregarReseñaScreenRouteProp;
    navigation: AgregarReseñaScreenNavigationProp;
    };

    const AgregarReseñaScreen: React.FC<Props> = ({ route, navigation }) => {
    const { productId } = route.params;
    const [producto, setProducto] = useState<any>(null);
    const [reviewText, setReviewText] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        const fetchProducto = async () => {
        try {
            const productoDoc = await getDoc(doc(db, 'productos', productId));
            if (productoDoc.exists()) {
            setProducto(productoDoc.data());
            } else {
            console.error('Producto no encontrado');
            }
        } catch (error) {
            console.error('Error fetching producto:', error);
        }
        };

        fetchProducto();
    }, [productId]);

    const submitReview = async () => {
        if (!reviewText.trim() || rating === 0) {
        Alert.alert('Error', 'Debe ingresar texto para la reseña y una puntuación');
        return;
        }

        try {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'No se ha iniciado sesión');
            return;
        }

        const newReview = {
            productoId: productId,
            descripcion: reviewText,
            rating,
            enviadoPor: user.email,
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
        };

        await addDoc(collection(db, 'reviews'), newReview);
        Alert.alert('Éxito', 'Reseña enviada exitosamente');
        navigation.goBack();
        } catch (error) {
        console.error('Error submitting review:', error);
        Alert.alert('Error', 'Hubo un problema al enviar la reseña');
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
        stars.push(
            <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Ionicons name={i <= rating ? 'star' : 'star-outline'} size={32} color="#FA7929" />
            </TouchableOpacity>
        );
        }
        return <View style={styles.starContainer}>{stars}</View>;
    };

    return (
        <View style={styles.container}>
        {producto && (
            <View style={styles.productContainer}>
            <Image source={{ uri: producto.imagenURL }} style={{
                        width: 300,
                        height: 160,
                        borderRadius: 15,
                        marginRight: 20,
                        marginTop: 10,}} />
            <Text style={styles.productTitle}>{producto.nombre}</Text>
            </View>
        )}
        <TextInput
            style={styles.inputLine}
            placeholder="Escriba su reseña"
            value={reviewText}
            onChangeText={setReviewText}
            multiline
        />
        {renderStars()}
        <TouchableOpacity style={styles.button} onPress={submitReview}>
            <Text style={styles.buttonText}>Enviar Reseña</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        </View>
    );
    };

    export default AgregarReseñaScreen;
