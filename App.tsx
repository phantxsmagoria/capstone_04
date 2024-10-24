import './src/firebaseConfig'; // Asegúrate de que este archivo se importe al inicio
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // este es para los iconos
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
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#FA7929'}}>
      <Tab.Screen name="Buscar" component={SearchScreen} options={{tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="home-search" size={24} color={color} />)}} />
      <Tab.Screen name="Carrito" component={CartScreen} options={{tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="cart-outline" size={24} color={color} />)}}/>
      <Tab.Screen name="Usuario" component={UserScreen} options={{tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name="account" size={24} color={color} />)}} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
