import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import CartScreen from './src/screens/CartScreen';
import UserScreen from './src/screens/UserScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';

// Define the types for navigation
type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Registro: undefined;
  Login: undefined;
  Buscar: undefined;
  Carrito: undefined;
  Usuario: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Buscar" component={SearchScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Usuario" component={UserScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
