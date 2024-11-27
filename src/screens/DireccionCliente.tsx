import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import styles from '../styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type RootStackParamList = {
    DireccionCliente: undefined;
    Carrito: undefined;
    Pago: undefined;
}

type DireccionClienteNavigationProp = StackNavigationProp<RootStackParamList, 'DireccionCliente'>;
type DireccionClienteRouteProp = RouteProp<RootStackParamList, 'DireccionCliente'>;

type Props = {
    navigation: DireccionClienteNavigationProp;
    route: DireccionClienteRouteProp;
};
type PickerItem = {
    label: string;
    value: string;
};

export default function DireccionCliente({ navigation }: Props) {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [comuna, setComuna] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [comunas, setComunas] = useState<PickerItem[]>([]);
    const [ciudades, setCiudades] = useState<PickerItem | null>(null);
    const [errorMessageCli, setErrorMessageCli] = useState('');

    const usuarioId = auth.currentUser?.uid;

    useEffect(() => {
        const fetchDatosDireccion = async () => {
            try {
                const docRef = doc(db, 'direccionCliente', usuarioId!);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNombre(data?.nombre || '');
                    setTelefono(data?.telefono || '');
                    setCorreo(data?.correo || '');
                    setDireccion(data?.direccion || '');
                    setComuna(data?.comuna || '');
                    setCiudad(data?.ciudad || '');
                }
                const comunasSnapshot = await getDocs(collection(db,'comuna'));
                const comunasList = comunasSnapshot.docs.map(doc=>({
                    label: doc.data().nom_comuna,
                    value: doc.data().nom_comuna,
                }));
                setComunas(comunasList);

                const ciudadesSnapshot = await getDocs(collection(db,'ciudad'));
                if (ciudadesSnapshot.docs.length > 0 ){
                    const doc = ciudadesSnapshot.docs[0];
                    setCiudades({
                        label: doc.data().nom_ciudad,
                        value: doc.data().nom_ciudad,
                    });
                }
            } catch (error) {
                console.error('Error obteniendo los datos: ', error);
            }
        };
        if (usuarioId) {
            fetchDatosDireccion();
        }
    }, [usuarioId]);

    const validarNombre = (nom: string): boolean => /^[a-zA-Z\s]+$/.test(nom);
    const validarTelefono = (tel: string): boolean => /^[0-9]{9}$/.test(tel);
    const validarCorreo = (mail: string): boolean => /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/.test(mail);
    const validarDireccion = (dir: string): boolean => /^[a-zA-Z0-9\s#]+$/.test(dir);

    const handleDireccion = async () => {
        setErrorMessageCli('');

        if (!nombre || !telefono || !correo || !direccion || !comuna || !ciudad) {
            setErrorMessageCli('Todos los campos son obligatorios');
            return;
        }

        if (!validarNombre(nombre)) { 
            setErrorMessageCli('No se puede ingresar número o carácteres especiales'); 
            return; 
        }

        if (!validarTelefono(telefono)) { 
            setErrorMessageCli('El teléfono debe tener 9 dígitos numéricos'); 
            return; 
        }
        if (!validarCorreo(correo)) { 
            setErrorMessageCli('El correo debe terminar en @gmail.com, @yahoo.com, @hotmail.com o @outlook.com'); 
            return; 
        }
        if (!validarDireccion(direccion)) { 
            setErrorMessageCli('La dirección solo puede contener letras, números y "#"'); 
            return; 
        }

        try {
            const docRef = doc(db, 'direccioncliente', usuarioId!);
            await setDoc(docRef, {
                nombre,
                telefono,
                correo,
                direccion,
                comuna,
                ciudad,
                usuarioId,
            });
            navigation.navigate('Pago');
        } catch (error) {
            console.error('Error añadiendo los datos: ', error);
            setErrorMessageCli('Error al añadir los datos');
        }
    };


    return (
        <ScrollView style={styles.fondoView3}>
            <View>
                <TouchableOpacity style={styles.nomProfile} onPress={() => navigation.navigate('Carrito')}>
                    <MaterialIcons name="arrow-back-ios" size={35} color="#FA7929" />
                    <Text style={styles.tituloMenusOptica}>Dirección</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textReceta}>
                <View style={styles.contenedorIcon1}>
                    <View style={styles.containerIcon}>
                        <Text style={styles.numeroIcon}>1</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 2, fontSize: 18 }}>Información del Recibidor</Text>
            </View>
            <View style={styles.contendorDireccionCli}>
                <TextInput style={styles.itemDireccionCli}
                    placeholder='Nombre y Apellido'
                    value={nombre}
                    editable={true}
                    onChangeText={(nom) => { if (validarNombre(nom) || nom === '') { setNombre(nom); setErrorMessageCli(''); } else { setErrorMessageCli('No se puede ingresar número o carácteres especiales'); } }}
                />
                <View style={styles.telefonoContainer}>
                    <Text style={styles.telefonoIdi}>+56</Text>
                    <TextInput style={styles.telefono}
                        placeholder='Teléfono'
                        value={telefono}
                        editable={true}
                        keyboardType='numeric'
                        maxLength={9}
                        onChangeText={(tel) => { if (validarTelefono(tel) || tel === '') { setTelefono(tel); setErrorMessageCli(''); } else { setTelefono(tel); setErrorMessageCli('El teléfono debe tener 9 dígitos numéricos'); } }}
                    />
                </View>

                <TextInput style={styles.itemDireccionCli}
                    placeholder='Email'
                    value={correo}
                    editable={true}
                    onChangeText={(mail) => { if (validarCorreo(mail) || mail === '') { setCorreo(mail); setErrorMessageCli(''); } else { setCorreo(mail); setErrorMessageCli('El correo debe terminar en @gmail.com, @yahoo.com, @hotmail.com o @outlook.com'); } }}
                />
            </View>

            <View style={styles.textReceta}>
                <View style={styles.contenedorIcon1}>
                    <View style={styles.containerIcon}>
                        <Text style={styles.numeroIcon}>2</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 2, fontSize: 18 }}>Dirección de envío</Text>
            </View>
            <View style={styles.contendorDireccionCli}>
                <TextInput style={styles.itemDireccionCli}
                    placeholder='Dirección'
                    value={direccion}
                    editable={true}
                    onChangeText={setDireccion}
                />
                <RNPickerSelect
                    onValueChange={(value) => setComuna(value)}
                    items={comunas}
                    value={comuna}
                    style={{ inputAndroid: styles.itemDireccionCli }}
                    placeholder={{
                        label: 'Comuna',
                        value: null
                    }}
                />
                <RNPickerSelect
                    onValueChange={(value) => setCiudad(value)}
                    items={ciudades ? [ciudades] : []}
                    value={ciudad}
                    style={{ inputAndroid: styles.itemDireccionCli }}
                    placeholder={{
                        label: 'Ciudad',
                        value: null
                    }}
                />
            </View>
            {errorMessageCli ? (
                <Text style={{ color: 'red', textAlign: 'center', margin: 10 }}>{errorMessageCli}</Text>) : null}
            <View>
                <TouchableOpacity style={styles.botonReceta} onPress={handleDireccion}>
                    <Text style={styles.botonTextReceta}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}