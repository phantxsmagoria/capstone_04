import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import styles from '../styles/styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';

type RootStackParamList = {
    Perfil: undefined; 
    Home: undefined;
    RecetaScreen: undefined;
}

type ProfileClienteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Perfil'>;
type ProfileClientesScreenRouterProp = RouteProp<RootStackParamList,'Perfil'>;
type Props = {navigation: ProfileClienteScreenNavigationProp; route:ProfileClientesScreenRouterProp};

export default function ProfileClienteScreen({navigation}: Props) {
    const [userName, setUserName] = useState<string>('Usuario');

    useEffect(() => {
        fetchUserName();
    }, []);

    const fetchUserName = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, 'users'), where('uid', '==', user.uid));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    console.log("User data fetched:", userData); // Debugging line
                    setUserName(userData.name);
                } else {
                    console.error("No user data found for uid:", user.uid);
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        } else {
            console.error("No user is logged in");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('user');
            navigation.navigate('Home');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <View>
            <View style={styles.nomProfile}>
                <FontAwesome5 name="user-circle" size={40} color="black" />
                <Text style={{ fontSize: 35 }}>{userName}</Text>
            </View>           

            <View>
                <Text style={{padding: 20, fontSize: 25}}>Mis Pedidos</Text>
            </View>
            
            <View style={{flex:1, flexDirection:'row', flexWrap:'wrap', justifyContent: 'center'}}> 
                <TouchableOpacity style={styles.itemProfile}> 
                    <Ionicons name="wallet-outline" size={24} color="black" /> 
                    <Text style={styles.textProfile}>Mis Pagos</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={styles.itemProfile}> 
                    <Ionicons name="receipt-outline" size={24} color="black" /> 
                    <Text style={styles.textProfile}>Mis Boletas</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={styles.itemProfile} onPress={() => navigation.navigate('RecetaScreen')}> 
                    <FontAwesome5 name="glasses" size={24} color="black" /> 
                    <Text style={styles.textProfile}>Mi Receta</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={styles.itemProfile}> 
                    <Feather name="alert-circle" size={24} color="black" /> 
                    <Text style={styles.textProfile}>Notificar un error</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={styles.itemProfile}> 
                    <Feather name="tool" size={24} color="black" /> 
                    <Text style={styles.textProfile}>Configuración y Soporte</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={styles.itemProfile} onPress={handleLogout}> 
                    <Feather name="log-out" size={24} color="black" /> 
                    <Text style={styles.textProfile}>Cerrar Sesión</Text> 
                </TouchableOpacity> 
            </View>
        </View>
    );
}
