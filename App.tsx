import 'react-native-gesture-handler';
import 'react-native-reanimated';
import './src/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import CartScreen from './src/screens/CartScreen';
import UserScreen from './src/screens/UserScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterCliente from './src/screens/RegisterCliente';
import RegisterOptica from './src/screens/RegisterOptica';
import LoginScreen from './src/screens/LoginScreen';
import RegistroOpticaDocumento from './src/screens/RegistroOpticaDocumento';
import OpticaScreen from './src/screens/OpticaScreen';
import ProfileClienteScreen from './src/screens/ProfileClienteScreen';
import VerProducto from './src/screens/VerProducto';
import ProductoOptica from './src/screens/ProductoOptica';
import RecetaScreen from './src/screens/RecetaScreen';
import OpticaCobroPendiente from './src/screens/OpticaCobroPendiente';
import OpticaEnvioPendiente from './src/screens/OpticaEnvioPendiente';
import OpticaEnviado from './src/screens/OpticaEnviado';
import OpticaReseña from './src/screens/OpticaReseña';
import OpticaColaPedidos from './src/screens/OpticaColaPedidos';
import OpticaNotificarError from './src/screens/OpticaNotificarError';
import OpticaConfiguracion from './src/screens/OpticaConfiguracion';

type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Register: undefined;
  RegisterCliente: undefined;
  RegisterOptica: undefined;
  Login: undefined;
  Buscar: undefined;
  Carrito: undefined;
  Usuario: undefined;
  RegisterOpticaDocumento: undefined;
  OpticaHome: undefined;
  OpticaScreen: undefined;
  Perfil: undefined;
  ProductoOptica: undefined;
  VerProducto: undefined;
  RecetaScreen: undefined;
  OpticaCobroPendiente: undefined;
  OpticaEnvioPendiente: undefined;
  OpticaEnviado: undefined;
  OpticaReseña: undefined;
  OpticaColaPedidos: undefined;
  OpticaNotificarError: undefined;
  OpticaConfiguracion: undefined;
};

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
        name="Buscar" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color }) => (
            <Feather name="search" size={24} color={color} />
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
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | 'Login' | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.type === 'cliente') {
            setInitialRouteName('Usuario');
          } else if (user.type === 'optica') {
            setInitialRouteName('OpticaScreen');
          } else {
            setInitialRouteName('MainTabs');
          }
        } else {
          setInitialRouteName('Login');
        }
      } catch (error) {
        console.error("Error checking user session: ", error);
        setInitialRouteName('Login');
      } finally {
        setLoading(false);
      }
    };
    checkUserSession();
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Cargando...</Text></View>;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterCliente" component={RegisterCliente} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterOptica" component={RegisterOptica} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterOpticaDocumento" component={RegistroOpticaDocumento} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaScreen" component={OpticaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Usuario" component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductoOptica" component={ProductoOptica} options={{ headerShown: false }} />
        <Stack.Screen name="VerProducto" component={VerProducto} options={{ headerShown: false }} />
        <Stack.Screen name="RecetaScreen" component={RecetaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaCobroPendiente" component={OpticaCobroPendiente} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaEnvioPendiente" component={OpticaEnvioPendiente} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaReseña" component={OpticaReseña} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaEnviado" component={OpticaEnviado} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaColaPedidos" component={OpticaColaPedidos} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaNotificarError" component={OpticaNotificarError} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaConfiguracion" component={OpticaConfiguracion} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
