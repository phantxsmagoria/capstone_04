import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    titleLogin: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginTop: -190,
        marginLeft: -64,
        marginBottom: 100,
    },
    titleRegister: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginTop: -200,
        marginLeft: -86,
        marginBottom: 80,
    },
    titleRegisterCliente: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginTop: -100,
        marginRight: 170,
        marginBottom: 80,
    },
    titleRegisterClienteNatural: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 0,
        marginRight: 150,
        marginBottom: 80,
    },
    inputLine: {
        width: '85%',
        height: 30,
        borderBottomColor: '#FA7929',
        borderBottomWidth: 1,
        marginBottom: 30,
        backgroundColor: 'transparent',
        fontSize: 12,
    },
    separator: {
        marginBottom: 20,
    },
    inputLineFocus: {
        borderWidth: 0,
    },
    button: {
        width: '63%',
        height: 40,
        backgroundColor: '#FA7929',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: 12,
    },
    forgotPasswordText: {
        color: '#000',
        fontSize: 12,
    },
    logo: {
        width: 280,
        height: 280,
        marginTop: 0,
        resizeMode: 'contain',
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 15,
    },
    picker: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 5,
    },
    labelFecha: {
        alignSelf: 'flex-start',
        width: '80%',
        marginLeft: 40,
        marginBottom: 10,
        color: '#333',
    },
    buttonContainer: {
        marginTop: 400,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#FA7929',
        width: '80%',
        height: 60,
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    loginButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        borderRadius: 98,
        backgroundColor: '#FA7929',
    },
    loginButtonText: {
        color: '#ffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerButtonText: {
        fontSize: 18,
        marginRight: 30,
        fontWeight: 'bold',
    },
    registerButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        borderRadius: 98,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    pCliente: {
        marginTop: -80,
        marginRight: 300,
        marginBottom: 30,
    },
    pClienteNatural: {
        marginTop: -80,
        marginRight: 265,
        marginBottom: 30,
    },
    errorText: {  // Añadimos esto
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    successText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
      },
      //
      cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 20,
      },

      productImage: {
        width: 60,
        height: 60,
        marginRight: 10 },


        // Style CartScreen
    
      productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      productDescription: {
        fontSize: 14,
        color: '#666',
      },
      productSubtitle: {
        fontSize: 12,
        color: '#aaa',
      },
      productPrice: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'},
        trashButton: {
            padding: 10,
            borderRadius: 50,
            backgroundColor: '#FA7929',
            justifyContent: 'center',
            alignItems: 'center',
          },
          card: {
            padding: 15,
            backgroundColor: '#f9f9f9',
            borderRadius: 10,
            marginBottom: 20,
            alignItems: 'center',
          },
          cardTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          },
          
    // Style Perfil de usuario
    nomProfile: {
        padding: 20, 
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    itemProfile: { 
        fontSize: 10, 
        backgroundColor: '#f9f9f9', 
        width: 65, 
        height: 90, 
        justifyContent: 'center', 
        alignItems: 'center', 
    }, 
    textProfile: { 
        fontSize: 10, 
        textAlign: 'center', 
        marginTop: 5, 
    },
      
});
