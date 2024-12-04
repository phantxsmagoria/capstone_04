import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import styles from '../styles/styles'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
    CompartidoOptica: undefined;
    OpticaScreen: undefined;
    DetalleCompartido: {recetaId: string};

};

type CompartidoOpticaNavigationProp = StackNavigationProp<RootStackParamList, 'CompartidoOptica'>;
type CompartidoOpticaRouteProp = RouteProp<RootStackParamList, 'CompartidoOptica'>;

type Props = {
    navigation: CompartidoOpticaNavigationProp;
    route: CompartidoOpticaRouteProp;
};

interface Receta {
    id: string;
    ODesfera: string;
    ODcilindro: string;
    ODeje: string;
    OIesfera: string;
    OIcilindro:string;
    OIeje: string;
    adicion: string;
    distanciapupilar: string;
    userId: string;
    userName: string;
    compartir: Date;

}


export default function CompartidoOptica({navigation}: Props) {
    const [recetas, setRecetas] = useState<Receta[]>([]);

    const fetchCompartidoOptica = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'compartirReceta'));
            const uniqueRecetas: {[key: string]: Receta} = {};
            querySnapshot.docs.forEach((doc) => {
              const data = doc.data() as Omit<Receta, 'id'>;
              uniqueRecetas[data.userId] = {id: doc.id, ...data};
            })
            setRecetas(Object.values(uniqueRecetas));
        } catch (error) {
            console.error('Error obteniendo recetas compartidas: ', error);
        }
    };
    
    useEffect(() =>{
        fetchCompartidoOptica();
    }, []);
  return (
    <View>
      <View>
        <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('OpticaScreen')}>
          <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
          <Text style={styles.tituloMenusOptica}>Compartido</Text>
        </TouchableOpacity>
      </View>
      <FlatList
      data={recetas}
      renderItem={({item}) => (
        <TouchableOpacity
        style={styles.recetaItem}
        onPress={() => navigation.navigate('DetalleCompartido', {recetaId: item.id})}
        >
        <Text>{item.userName}</Text> 
    </TouchableOpacity>
      )}
      />

    </View>
  )
}