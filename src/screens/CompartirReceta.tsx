import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { doc, getDoc, getDocs, query, collection, where, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';

type RootStackParamList = {
    Compartir: undefined;
    CompartidoOptica: undefined;
};

type CompartirNavigationProp = StackNavigationProp<RootStackParamList, 'Compartir'>;
type CompartirRouteProp = RouteProp<RootStackParamList, 'Compartir'>;

type Props = {
    navigation: CompartirNavigationProp;
    route: CompartirRouteProp;
};

export default function CompartirReceta({ navigation }: Props) {
    const [ODesfera, setOdEsfera] = useState<string>('');
    const [ODcilindro, setOdCilindro] = useState<string>('');
    const [ODeje, setOdEje] = useState<string>('');
    const [OIesfera, setOiEsfera] = useState<string>('');
    const [OIcilindro, setOiCilindro] = useState<string>('');
    const [OIeje, setOiEje] = useState<string>('');
    const [adicion, setAdicion] = useState<string>('');
    const [distanciapupilar, setDistanciaPupilar] = useState<string>('');
    const [userName, setUserName] = useState<string>('Usuario');


    const usuarioId = auth.currentUser?.uid;

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

    const fetchDatosCompartirReceta = async () => {
        try {
            const docRef = doc(db, 'receta', usuarioId!);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setOdEsfera(data?.ODesfera || '');
                setOdCilindro(data?.ODcilindro || '');
                setOdEje(data?.ODeje || '');
                setOiEsfera(data?.OIesfera || '');
                setOiCilindro(data?.OIcilindro || '');
                setOiEje(data?.OIeje || '');
                setAdicion(data?.adicion || '');
                setDistanciaPupilar(data?.distanciapupilar || '');
            }
        } catch (error) {
            console.error('Ha ocurrido un error al momento de obtener los datos: ', error);
        }
    };
    const handleCompartirReceta = async () => {
        try {
            await addDoc(collection(db, 'compartirReceta'), {
                ODesfera,
                ODcilindro,
                ODeje,
                OIesfera,
                OIcilindro,
                OIeje,
                adicion,
                distanciapupilar,
                userId: usuarioId,
                userName,
                compartir: new Date(),
            });
            navigation.navigate('CompartidoOptica');
        } catch (error) {
            console.error('Se ha producido una error al compartir la receta: ', error)
            Alert.alert('Error', 'Hubo un problema al compartir tu receta.');
        }
    };

    useEffect(() => {
        fetchUserName();
        if (usuarioId) {
            fetchDatosCompartirReceta();
        }
        const intervalo = setInterval(() => {
            if (usuarioId) {
                fetchDatosCompartirReceta();
            }
        }, 5000);
        return () => clearInterval(intervalo);
    }, [usuarioId]);

    return (
        <View>
            <View>
                <Text style={[styles.title, { textAlign: 'center', marginTop: 50, marginBottom: 20 }]}>Compartir Receta</Text>
            </View>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginLeft: 15 }}>Mi Receta</Text>
            </View>
            <View>
                <Text style={{ marginLeft: 15, fontSize: 14, marginTop: 5 }}>OD: Ojo Derecho</Text>
            </View>
            <View style={styles.contenedorReceta}>
                <Text style={styles.itemReceta} >ESF / SPH: {ODesfera}</Text>
                <Text style={styles.itemReceta}>CLI / CYL: {ODcilindro}</Text>
                <Text style={styles.itemReceta}>EJE: {ODeje}</Text>
            </View>
            <View>
                <Text style={{ marginLeft: 15, fontSize: 14, marginTop: 10 }}>OI: Ojo Izquierdo</Text>
            </View>
            <View style={styles.contenedorReceta}>
                <Text style={styles.itemReceta}>ESF / SPH: {OIesfera}</Text>
                <Text style={styles.itemReceta}>CLI / CYL: {OIcilindro}</Text>
                <Text style={styles.itemReceta}>EJE: {OIeje}</Text>
            </View>
            <View style={styles.contendorReceta2}>
                <Text style={styles.itemReceta2}>Adición: {adicion}</Text>
                <Text style={styles.itemReceta2}>Distancia Pupilar: {distanciapupilar}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.botonReceta} onPress={handleCompartirReceta}>
                    <Text style={styles.botonTextReceta}>{'Compartir Receta'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}