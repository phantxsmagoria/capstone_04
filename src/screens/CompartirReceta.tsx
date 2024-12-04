import { View, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { doc, getDoc, getDocs, query, collection, where, setDoc } from 'firebase/firestore';
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

interface Comentario {
    comentario: string;
    nombreOptica: string;
}


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
    const [comentariosOptica, setComentariosOptica] = useState<Comentario[]>([]);
    const prevComentarRef = useRef<string[]>([]);
    const [hayNuevoComentario, setHayNuevoComentario] = useState<boolean>(false);

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
            const recetaRef = doc(db, 'compartirReceta', usuarioId!);
            const recetaSnap = await getDoc(recetaRef);
            if (recetaSnap.exists()) {
                //Acá actualiza la receta existente
                await setDoc(recetaRef, {
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
                }, { merge: true });
            } else {
                // acá crea una nueva receta
                await setDoc(recetaRef, {
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
            }
            Alert.alert('Exitosamente', 'Tu receta ha sido compartida.')
        } catch (error) {
            console.error('Se ha producido una error al compartir la receta: ', error)
            Alert.alert('Error', 'Hubo un problema al compartir tu receta.');
        }
    };

    const fetchComentarioOptica = async () => {
        try {
            const comentarioRef = collection(db, 'compartirReceta', usuarioId!, 'comentarios');
            const querySnapshot = await getDocs(comentarioRef);
            if (!querySnapshot.empty) {
                const comentarioData = querySnapshot.docs.map(doc =>
                    ({
                        comentario: doc.data().comentario,
                        nombreOptica: doc.data().nombreOptica,
                    }) as Comentario);
                if (JSON.stringify(comentarioData) !== JSON.stringify(prevComentarRef.current)) {
                    setComentariosOptica(comentarioData);
                    prevComentarRef.current = comentarioData.map(c => c.comentario);
                    setHayNuevoComentario(true);
                } else {
                    setHayNuevoComentario(false);
                }
            } else {
                if (comentariosOptica.length > 0) {
                    setComentariosOptica([]);
                    prevComentarRef.current = [];
                    console.log('No se han encontrado comentarios.');
                }
                setHayNuevoComentario(false);
            }
            if (hayNuevoComentario) {
                //console.log('Comentarios recuperados: ', comentariosOptica);
            }
        } catch (error) {
            console.error('Error fetching comentarios: ', error);
        }
    }
    useEffect(() => {
        fetchUserName();
        if (usuarioId) {
            fetchDatosCompartirReceta();
            fetchComentarioOptica();
        }
        const intervalo = setInterval(() => {
            if (usuarioId) {
                fetchDatosCompartirReceta();
                fetchComentarioOptica();
            }
        }, 5000);
        return () => clearInterval(intervalo);
    }, [usuarioId]);

    return (
        <ScrollView>
            <View>
                <Text style={[styles.title, { textAlign: 'center', marginTop: 50, marginBottom: 20 }]}>Compartir Receta</Text>
            </View>
            <View>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, margin: 10, textAlign: 'center' }}>¿Deseas compartir tu receta?</Text>
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: 'semibold', marginTop: 20, margin: 10, textAlign: 'justify' }}>Si compartes tu receta podrás obtener descuentos y/o precios exclusivos por las Ópticas Asociadas.</Text>
            </View>
            <View style={styles.fotoComentarios}>
                <Image source={require('../assets/ComentarioCliente.png')} style={{ width: 300, height: 300 }} />
            </View>
            <View>
                <TouchableOpacity style={styles.botonReceta} onPress={handleCompartirReceta}>
                    <Text style={styles.botonTextReceta}>{'Compartir Receta'}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginLeft: 15 }}>Comentarios</Text>
                {comentariosOptica.length > 0 ? (
                    comentariosOptica.map((comentario, index) => (
                        <Text key={index} style={styles.comentarios}>{comentario.nombreOptica}: {comentario.comentario}</Text>
                    ))
                ) : (
                    <Text style={{ marginLeft: 15, marginTop: 5 }}>No hay comentarios existentes</Text>
                )}
            </View>
        </ScrollView>
    )
}