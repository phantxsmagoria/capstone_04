import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { // Asegúrate de que el contenedor principal ocupa todo el espacio disponible
        flexDirection: 'column',
        height:890,
        backgroundColor: '#fff',
        padding: 20,
        margin: 5,
      },

      scrollViewContent: {
        paddingBottom: 20, // Añade padding al contenido para asegurar espacio suficiente
      },
      header: {
        justifyContent: 'center',
        alignItems: 'center',
        left: 0,
        right: 0,
        paddingTop: 25,
      },
      title: {
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: 20,
      },
      card: {
        height: 100,
        backgroundColor: '#E6DDC4',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
      },
      subtitle: {
        color: '#181D31',
        fontWeight: 'bold',
      },
});
