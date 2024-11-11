import './src/firebaseConfig'; // Nuestra base de datos
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Feather from '@expo/vector-icons/Feather'; // este es para los iconos
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
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#FA7929' }}>
      <Tab.Screen 
        name="Usuario" 
        component={UserScreen} // este es la pestaña inicial onda tipo home
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Buscar" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={24} color={color}/>
          ), 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Carrito" 
        component={CartScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileClienteScreen} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ), 
          headerShown: false 
        }} 
      />
    </Tab.Navigator>
    
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterCliente" component={RegisterCliente} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterOptica" component={RegisterOptica} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterOpticaDocumento" component={RegistroOpticaDocumento} options={{ headerShown: false }} />
        <Stack.Screen name="OpticaScreen" component={OpticaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Usuario" component={UserScreen} options={{ headerShown: false}} />
        <Stack.Screen name="ProductoOptica" component={ProductoOptica} options={{ headerShown: false}}/>
        <Stack.Screen name="VerProducto" component={VerProducto} options={{headerShown: false}}/>
        <Stack.Screen name="RecetaScreen" component={RecetaScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
