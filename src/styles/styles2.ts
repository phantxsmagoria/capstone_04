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
      productContainer: {
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
      },
      productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
      },
      productDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
      },
      productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
        marginVertical: 5,
      },
      button: {
        backgroundColor: '#FA7929',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      inputLine: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
      },
      errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
      },
      successText: {
        color: 'green',
        fontSize: 14,
        marginTop: 10,
      },
      titulosPagina: {
        fontSize: 30,
        marginTop: -34,
        color: '#000',
        marginLeft:30,
      },
      //Css EditarProducto
      nuevoProducto: { display: 'flex',
         flexDirection: 'row',
        gap: 10, alignItems: 'center', 
        backgroundColor: '#f9f9f9', 
        padding: 20, marginVertical: 10, 
        marginTop: 15, borderRadius: 10, 
        marginLeft: 10, marginRight: 10, },

       addButton: { 
          backgroundColor: '#FA7929', 
          padding: 10, 
          borderRadius: 5, 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'row', 
          marginTop: 10, 
        }, 
        
        addButtonText: { 
          color: 'white', 
          fontSize: 16, 
          fontWeight: 'bold', 
          marginLeft: 5, 
        },
});
