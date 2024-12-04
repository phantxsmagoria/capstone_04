import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, doc, getDoc, addDoc, query, where } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import styles from '../styles/styles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type RootStackParamList = {
    OpticaScreen: undefined;
    DetalleCompartido: { recetaId: string };

};

type DetalleCompartidoNavigationProp = StackNavigationProp<RootStackParamList, 'DetalleCompartido'>;
type DetalleCompartidoRouteProp = RouteProp<RootStackParamList, 'DetalleCompartido'>;

type Props = {
    navigation: DetalleCompartidoNavigationProp;
    route: DetalleCompartidoRouteProp;
};

interface Receta {
    id: string;
    ODesfera: string;
    ODcilindro: string;
    ODeje: string;
    OIesfera: string;
    OIcilindro: string;
    OIeje: string;
    adicion: string;
    distanciapupilar: string;
    userId: string;
    userName: string;
    compartir: Date;

}

interface Comentario {
    id: string;
    recetaId: string;
    comentario: string;
    nombreOptica: string;
}

export default function DetalleCompartido({ navigation, route }: Props) {
    const { recetaId } = route.params;
    const [receta, setReceta] = useState<Receta | null>(null);
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [nombreOptica,setNombreOptica] = useState<string>('');

    const fetchDetalleCompartido = async () => {
        try {
            const docRef = doc(db, 'compartirReceta', recetaId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setReceta({ id: docSnap.id, ...docSnap.data() } as Receta);
            }
        } catch (error) {
            console.error('Error al tratar de obtener los datos de la receta: ', error);
        }
    };

    const fetchNomOptica = async() => {
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, 'opticas'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                if(!querySnapshot.empty){
                    const userData = querySnapshot.docs[0].data();
                    setNombreOptica(userData?.nombreOptica || '');
                }
            } catch (error){ 
                console.error('Error al obtener el nombre de la optica: ', error)
            }
        }

    }

    const fetchComentario = async () => {
        try {
            const comentarioSnapshot = await getDocs(collection(db, 'compartirReceta', recetaId, 'comentarios'));
            const comentarioArray: Comentario[] = comentarioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comentario));
            setComentarios(comentarioArray);
        } catch (error) {
            console.error('Error al intentar de obtener comentario: ', error);
        }
    };

    const handleComentario = async () => {
        try {
            await addDoc(collection(db, 'compartirReceta', recetaId, 'comentarios'), {
                comentario,
                recetaId,
                nombreOptica
            });
            setComentario('');
            fetchComentario();
        } catch (error) {
            console.error('Error al ingresar comentario: ', error)
        }
    };

    useEffect(() => {
        fetchDetalleCompartido();
        fetchComentario();
        fetchNomOptica();
    }, [recetaId]);

    if (!receta) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <FlatList
                ListHeaderComponent={
                    <View>
                        <View>
                            <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
                                <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
                                <Text style={styles.tituloMenusOptica}>Receta Detalle</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20, marginLeft: 15 }}>Mi Receta</Text>

                            <Text style={{ marginLeft: 15, fontSize: 14, marginTop: 5 }}>OD: Ojo Derecho</Text>

                            <View style={styles.contenedorReceta}>
                                <Text style={styles.itemReceta} >ESF / SPH: {receta.ODesfera}</Text>
                                <Text style={styles.itemReceta}>CLI / CYL: {receta.ODcilindro}</Text>
                                <Text style={styles.itemReceta}>EJE: {receta.ODeje}</Text>
                            </View>
                            <Text style={{ marginLeft: 15, fontSize: 14, marginTop: 10 }}>OI: Ojo Izquierdo</Text>

                            <View style={styles.contenedorReceta}>
                                <Text style={styles.itemReceta}>ESF / SPH: {receta.OIesfera}</Text>
                                <Text style={styles.itemReceta}>CLI / CYL: {receta.OIcilindro}</Text>
                                <Text style={styles.itemReceta}>EJE: {receta.OIeje}</Text>
                            </View>
                            <View style={styles.contendorReceta2}>
                                <Text style={styles.itemReceta2}>Adición: {receta.adicion}</Text>
                                <Text style={styles.itemReceta2}>Distancia Pupilar: {receta.distanciapupilar}</Text>
                            </View>
                        </View>
                        <View>
                            <TextInput
                                style={styles.textoComentario}
                                placeholder='Agrega un comentario'
                                value={comentario}
                                onChangeText={setComentario}
                            />
                            <TouchableOpacity style={[styles.botonReceta, { marginBottom: 20 }]} onPress={handleComentario}>
                                <Text style={styles.botonTextReceta}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }

                data={comentarios}
                renderItem={({ item }) => (
                    <View style={styles.comentario}>
                        <Text>{item.nombreOptica}: {item.comentario}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />

        </View>
    )
}