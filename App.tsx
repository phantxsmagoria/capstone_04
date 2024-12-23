import 'react-native-gesture-handler';
import 'react-native-reanimated';
import './src/firebaseConfig';
import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import HomeScreen from './src/screens/HomeScreen';
import CartScreen from './src/screens/CartScreen';
import UserScreen from './src/screens/UserScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterCliente from './src/screens/RegisterCliente';
import RegisterOptica from './src/screens/RegisterOptica';
import LoginScreen from './src/screens/LoginScreen';
import OpticaScreen from './src/screens/OpticaScreen';
import ProfileClienteScreen from './src/screens/ProfileClienteScreen';
import VerProducto from './src/screens/VerProducto';
import ProductoOptica from './src/screens/ProductoOptica';
import RecetaScreen from './src/screens/RecetaScreen';
import OpticaEnviado from './src/screens/OpticaEnviado';
import OpticaReseña from './src/screens/OpticaReseña';
import OpticaConfiguracion from './src/screens/OpticaConfiguracion';
import EditarProducto from './src/screens/EditarProducto';
import ProductoCliente from './src/screens/ProductoCliente';
import ClienteRegistroBoletas from './src/screens/ClienteRegistroBoletas';
import ClienteRegistroPagos from './src/screens/ClienteRegistroPagos';
import ReportErrorScreen from './src/screens/ReportErrorScreen';
import DatosCompra from './src/screens/DatosCompra';
import ReciboBoletaCliente from './src/screens/ReciboBoletaCliente';
import OlvidarContraseña from './src/screens/OlvidarContraseña';
import ClienteConfiguracion from './src/screens/ClienteConfiguracion';
import OpticaNotificarError from './src/screens/OpticaNotificarError';
import AgregarReseñaScreen from './src/screens/AgregarReseñaScreen'; 
import ReseñasClienteScreen from './src/screens/ReseñasClienteScreen';
import CompartirReceta from './src/screens/CompartirReceta'; 
import { auth } from './src/firebaseConfig'; 
import CompartidoOptica from './src/screens/CompartidoOptica';
import DetalleCompartido from './src/screens/DetalleCompartido';


type RootStackParamList = {
  MainTabs: undefined;
  Home: { showPopup?: boolean };
  Register: undefined;
  RegisterCliente: undefined;
  RegisterOptica: undefined;
  Login: undefined;
  Carrito: undefined;
  Usuario: undefined;
  OpticaHome: undefined;
  OpticaScreen: undefined;
  Perfil: undefined;
  ProductoOptica: undefined;
  VerProducto: undefined;
  OpticaReseña: undefined;
  RecetaScreen: undefined;
  OpticaEnviado: undefined;
  OpticaConfiguracion: undefined;
  ProductoCliente: undefined;
  ClienteRegistroBoletas: undefined;
  ClienteRegistroPagos: undefined;
  EditarProducto: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagenURL: string;
    categoria: string;
    quantity: number;
  };
  ReportErrorScreen: undefined;
  DatosCompra: undefined;
  ReciboBoletaCliente: undefined;
  OlvidarContraseña: undefined;
  ClienteConfiguracion: undefined;
  OpticaNotificarError: undefined;
  ReseñasClienteScreen: undefined;
  AgregarReseñaScreen: { productId: string };
  Publicar: undefined;
  CompartidoOptica: undefined;
  DetalleCompartido: { recetaId: string };
};

interface AuthContextType {
  checkUserSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#FA7929' }}>
      <Tab.Screen 
        name="Usuario" 
        component={UserScreen}
        options={{ 
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Carrito" 
        component={CartScreen} 
        options={{ 
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-cart" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Publicar" 
        component={CompartirReceta} 
        options={{ 
          tabBarIcon: ({ color }) => (
            <Feather name="share" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileClienteScreen} 
        options={{ 
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Stored User:', storedUser);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('User:', user);
        if (user.isLoggedIn !== false) { // Verifica si el usuario está marcado como logueado
          if (user.type === 'cliente') {
            setInitialRouteName('Usuario');
          } else if (user.type === 'optica') {
            setInitialRouteName('OpticaScreen');
          } else {
            setInitialRouteName('MainTabs');
          }
        } else {
          setInitialRouteName('Home');
        }
      } else {
        setInitialRouteName('Home');
      }
    } catch (error) {
      console.error("Error checking user session: ", error);
      setInitialRouteName('Home');
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const logout = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        parsedUser.isLoggedIn = false; // Marcamos que el usuario ha cerrado sesión.
        await AsyncStorage.setItem('user', JSON.stringify(parsedUser)); // Guardamos el estado actualizado del usuario.
      }
      setInitialRouteName('Home'); // Redirigimos a la pantalla de inicio.
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("onAuthStateChanged user:", user); // Añade un log para verificar el estado del usuario
      if (user) {
        try {
          const storedUser = await AsyncStorage.getItem('user');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("parsedUser:", parsedUser); // Añade un log para verificar los datos del usuario
            if (parsedUser.type === 'cliente') {
              setInitialRouteName('Usuario');
            } else if (parsedUser.type === 'optica') {
              setInitialRouteName('OpticaScreen');
            } else {
              setInitialRouteName('MainTabs');
            }
          } else {
            setInitialRouteName('MainTabs');
          }
        } catch (error) {
          console.error("Error parsing stored user: ", error);
          setInitialRouteName('Home');
        }
      } else {
        console.error("No user is logged in");
        setInitialRouteName('Home');
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);
  
  
  

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cargando...</Text></View>;
  }
  

  return (
    <AuthContext.Provider value={{ checkUserSession, logout }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName || 'Home'}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterCliente" component={RegisterCliente} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterOptica" component={RegisterOptica} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OpticaScreen" component={OpticaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Usuario" component={UserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductoOptica" component={ProductoOptica} options={{ headerShown: false }} />
          <Stack.Screen name="VerProducto" component={VerProducto} options={{ headerShown: false }} />
          <Stack.Screen name="RecetaScreen" component={RecetaScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OpticaReseña" component={OpticaReseña} options={{ headerShown: false }} />
          <Stack.Screen name="OpticaEnviado" component={OpticaEnviado} options={{ headerShown: false }} />
          <Stack.Screen name="OpticaConfiguracion" component={OpticaConfiguracion} options={{ headerShown: false }} />
          <Stack.Screen name="EditarProducto" component={EditarProducto} options={{ headerShown: false }} />
          <Stack.Screen name="ProductoCliente" component={ProductoCliente} options={{ headerShown: false }} />
          <Stack.Screen name="ClienteRegistroBoletas" component={ClienteRegistroBoletas} options={{ headerShown: false }} />
          <Stack.Screen name="ClienteRegistroPagos" component={ClienteRegistroPagos} options={{ headerShown: false }} />
          <Stack.Screen name="ReportErrorScreen" component={ReportErrorScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DatosCompra" component={DatosCompra} options={{ headerShown: false }} /> 
          <Stack.Screen name="ReciboBoletaCliente" component={ReciboBoletaCliente} options={{ headerShown: false }} />
          <Stack.Screen name="OlvidarContraseña" component={OlvidarContraseña} options={{ headerShown: false }} />
          <Stack.Screen name="ClienteConfiguracion" component={ClienteConfiguracion} options={{headerShown:false}}/>
          <Stack.Screen name="OpticaNotificarError" component={OpticaNotificarError} options={{headerShown:false}}/>
          <Stack.Screen name="AgregarReseñaScreen" component={AgregarReseñaScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ReseñasClienteScreen" component={ReseñasClienteScreen} options={{headerShown:false}}/>
          <Stack.Screen name="CompartidoOptica" component={CompartidoOptica} options={{headerShown:false}}/>
          <Stack.Screen name="DetalleCompartido" component={DetalleCompartido} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
