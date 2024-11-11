import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

type RootStackParamList = {
  Carrito: undefined;
  Buscar: undefined;
  Usuario: undefined;
  Home: undefined;
};

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Carrito'>;
type CartScreenRouteProp = RouteProp<RootStackParamList, 'Carrito'>;

type Props = {
  navigation: CartScreenNavigationProp;
  route: CartScreenRouteProp;
};

const CartScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', padding: 20, paddingTop: 40 }}>
      <Text style={[styles.title, { textAlign: 'center', marginTop: 0 }]}>Carrito</Text>

      <View style={styles.cartItem}>
        <Image
          source={{ uri: 'https://link-a-la-imagen-de-gafas.com' }}
          style={styles.productImage}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.productTitle}>Gafas rojas</Text>
          <Text style={styles.productDescription}>Marcos de gafas rojas</Text>
          <Text style={styles.productSubtitle}>Graduación: Monofocal</Text>
          <Text style={styles.productPrice}>$10.990</Text>
        </View>
        <TouchableOpacity style={styles.trashButton}>
          <Icon name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Orden</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Costo de Envío: Gratis</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Costo Total: $10.990</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Tiempo de entrega: 10 días hábiles</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

