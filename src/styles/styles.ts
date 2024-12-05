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
        marginRight: 120,
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
        marginLeft: 30,
        marginBottom: 10,
        color: '#333',
        fontWeight: '500',
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
        fontWeight: 'bold'
    },

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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    tituloMenusOptica: {
        fontSize:25,
        flex: 1,
    },
    tituloMenusOptica2: {
        fontSize:25,
        marginTop:10,
    },

    filasMenu:{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
    },

    itemProfile: { 
        fontSize: 10, 
        backgroundColor: '#fff', 
        width: 65, 
        height: 90, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 0,
        marginLeft:8,
    }, 
    
    textProfile: { 
        fontSize: 10, 
        textAlign: 'center', 
        marginTop: 5, 
    },
    containerOptica: {
        backgroundColor:'#fff',
        alignItems:'flex-start',

    },
    fondoView: {
        backgroundColor: '#fff',
        flex: 1,
    },
      
    
    // Style Formulario Receta
    textReceta:{
        padding: 5, 
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    contenedorReceta: {
        backgroundColor: '#e9ecef',
        marginTop: 20,
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: 160,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    itemReceta: {
        backgroundColor: '#f5f5f5',
        width: '40%',
        height: '30%',
        margin: 10,
        textAlign: 'center',
        fontWeight: 'semibold',
        fontSize: 14,
    },

    contendorReceta2: {
        backgroundColor: '#e9ecef',
        marginTop: 20,
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: 80,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemReceta2: {
        backgroundColor: '#f5f5f5',
        width: '40%',
        height: '50%',
        margin: 10,
        textAlign: 'center',
        fontWeight: 'semibold',
        fontSize: 14,
          
    },

    botonReceta:{
        backgroundColor:'#FA7929',
        marginTop: 30,
        borderRadius: 10,
        width: '60%',
        height: 50,
        alignItems: 'center',
        alignSelf: 'center',
    },
    botonTextReceta:{
        color: '#f5f5f5',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center',
        margin: 8,

    },
    cargardatosreceta: {
        flex: 1,
        justifyContent: 'center',
    },

    input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    paddingLeft: 8, 
    margin: 10, },

    popup: { 
    position: 'absolute', 
    top: 50, 
    padding: 10, 
    backgroundColor: '#333', 
    borderRadius: 5, 
    zIndex: 1000, 
    }, 

    popupText:  { 
    color: '#fff', 
    },
    // esto es de user screen

    columnWrapper:{
        justifyContent: 'space-between'
    },

    productoContainer: {
        flex: 1, 
        padding: 10, 
        marginTop: 20,
        margin: 5, 
        borderRadius: 10, 
        backgroundColor: '#f9f9f9', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 3.5, 
        elevation: 5,
    },

    singleColumnItem: {
        flex: 0.5,        
    },

    selectedItem: {
        backgroundColor: '#ddd', // Color de fondo para items seleccionados, o el hover, como le digas ustds ntp!!
      },

    unselectedItem: {
        backgroundColor: '#fff', // Color de fondo para items no seleccionados!!!!
    },

      // Ajuste imagen optica
    imagenOpticaContainer: {
        width: '100%', 
        marginTop: '50%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    textoOptica:{
        textAlign:'center', 
        fontSize: 18, 
        color: 'gray', 
        fontWeight:'semibold'
    },
    // esto es para edit perfil

    imagenOpticaContainerEdit: {
        width: '100%', 
        marginTop: 20,
        justifyContent:'center',
        alignItems:'center',
    },

    containerEdit: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    tituloPago: {
        marginTop: 20,
        marginLeft: 100,
    },

    fondoView2: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop:30,
    },
    
    confi: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },

    confiTitle: {
        fontSize: 16,
        fontWeight: 'semibold',
        marginBottom: 10,
    },

    // Esto es para Direccion Cliente
    contendorDireccionCli: {
        marginTop: 20,
        marginLeft: 20,
        alignItems: 'center',
        width: '90%',
        height: '24%',
        borderRadius: 10,
    },

    itemDireccionCli: {
        borderColor: '#EEEFF0',
        borderWidth: 1, 
        backgroundColor: '#ffffff',
        width: '90%',
        height: 50,
        margin: 10,
        textAlign: 'justify',
        fontWeight: 'semibold',
        fontSize: 14,   
        paddingLeft: 10,       
    },

    // Esto es para la parte del Teléfono
    telefonoContainer: {
        flexDirection: 'row',
        alignItems:'center',
        width: '90%',
        borderWidth: 1,
        borderColor: '#EEEFF0', 
        borderRadius: 5, 
        margin: 10, 
        backgroundColor: '#ffffff',
    },

    telefonoIdi:{
        padding: 15,
        color:'#888',
        backgroundColor:'#EEEFF0',
        borderTopLeftRadius:5,
        borderBottomLeftRadius: 5,
    },
    telefono:{
        flex:1,
        height:50,
        fontSize:14,
        fontWeight:'semibold',
        paddingLeft:10,
    },

    //Esto es para los "iconos" de los números
    contenedorIcon1: {
        marginLeft: 5,
    },

    containerIcon: {
        width: 35, 
        height: 35, 
        borderRadius: 25, 
        backgroundColor: '#FA7929', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    numeroIcon: {
        color: 'white', 
        fontSize: 20, 
        fontWeight: 'bold',
    },

    // esto es para el fondo de direccion cliente
    fondoView3: {
        backgroundColor: '#fff',
        flex: 1,
        height: 900,
    },

    // esto es para Pago Cliente
    textPago:{
        padding: 5,
        marginTop: 20,
        marginLeft: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    iconPago: {
        marginRight: 5,
        marginTop: 5,
    },

    textPagoCli:{
        paddingTop: 5, 
        fontSize: 20, 
        fontWeight: 'semibold', 
        marginVertical: 10, 
        paddingHorizontal: 15,
    },

    contenedorPagoCli1: {
        backgroundColor:'#e9ecef',
        marginTop: 20,
        marginLeft: 20,
        alignItems: 'center',
        width: '90%',
        height: '16%',
        borderRadius: 10,
    },
    itemPagoCli1: { 
        backgroundColor: '#ffffff',
        width: '90%',
        height: 50,
        margin: 10,
        textAlign: 'justify',
        fontWeight: 'semibold',
        fontSize: 14,   
        paddingLeft: 10,       
    },

    contenedorPagoCli2: {
        backgroundColor: '#e9ecef',
        marginTop: 20,
        marginLeft: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: '16%',
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    itemPagoCli2: {
        backgroundColor: '#ffffff',
        width: 150,
        height: 50,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'semibold',
        fontSize: 14,
    },
     
    infoPago:{
        marginLeft:35,
        justifyContent:'center',
    },

    contenedorCvv:{
        flexDirection:'row',
        alignItems:'center',
    },

    fondoHome:{
        flex: 1, 
        resizeMode: 'cover', 
        justifyContent: 'center',
    },

    // ReseñaCliente
    pickerContainer: { 
        marginVertical: 20, 
    },

    label: { 
        fontSize: 18, 
        marginBottom: 10, 
    },

    reseñaContainer: { 
        padding: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
    }, 

    reseñaTitle: { 
        fontWeight: 'bold', 
        fontSize: 16, 
    }, 

    emptyContainer: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, 
    }, 

    emptyImage: { 
        width: 200, 
        height: 200, 
        resizeMode: 'contain', 
    }, 

    emptyText: { 
        marginTop: 20, 
        fontSize: 18, 
        color: '#555', 
    },

    editButton: { 
        backgroundColor: '#ffcc00', 
        padding: 10, 
        alignItems: 'center', 
        borderRadius: 5, 
        marginTop: 10, 
    },

    editButtonText: { 
        color: '#000', 
        fontSize: 16, 
    },

    reviewButton: { 
        backgroundColor: '#007BFF', 
        padding: 10, 
        alignItems: 'center', 
        borderRadius: 5, 
        marginTop: 10, 
    },

    reviewButtonText: { 
        color: 'white', 
        fontSize: 16, 
    },

    productContainer: { 
        alignItems: 'center', 
        marginBottom: 20, 
    },

    starContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginBottom: 20, 
    },

    cancelButton: { 
        backgroundColor: '#d9534f',
        fontSize: 14,
        fontWeight: 'bold', 
        padding: 10, 
        alignItems: 'center', 
        borderRadius: 5, 
        marginTop: 10, 
    },

    cancelButtonText: { 
        color: 'white', 
        fontSize: 18, 
    },

    ratingContainer: { 
        flexDirection: 'row', 
        marginBottom: 10, 
    },

    fondoAgregarProducto: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: 0,
    },

    //CartScreen
    quantityContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10, 
    }, 
    quantityText: { 
        marginHorizontal: 10, 
        fontSize: 16, 
        fontWeight: 'bold', 
    },
    stockText: { 
        marginLeft: 10, 
        color: 'gray', 
    },
    // esto es para datos compra los items
    SelectItem: {
        width: 120,
    },

    // esto es para compartido optica
    recetaItem: { 
        padding: 10, 
        marginVertical: 8, 
        marginHorizontal: 16, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 10, 
    },

    // esto es para detalle compartido
    textoComentario: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        margin: 12, 
        paddingLeft: 8, 
        borderRadius: 4,
    },
    comentario:{
        padding: 10, 
        marginVertical: 8, 
        marginHorizontal: 16, 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 10,
    },

    // Esto es para BoletaCliente
    boletaContainer: { 
        backgroundColor: '#f9f9f9', 
        padding: 15, 
        marginVertical: 8, 
        marginHorizontal: 16, 
        borderRadius: 10, 
    },
    boletaTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 5, 
    },
    // esto es para los comentarios de Compartir Receta
    comentarios: {
        margin: 5,
        marginLeft: 10,
        marginRight: 10, 
        backgroundColor: '#ffffff',
        height: 'auto',
        borderRadius: 5,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        textAlign: 'justify',
        paddingLeft: 10,
        paddingTop: 1,
   },
   fotoComentarios: {
    alignItems: 'center'
   },
   contenedorCompra: {
    flexDirection: 'row',
    width: '90%',
    alignContent: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
   },

   contenedorDetalle: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop:30,
    marginBottom: 0,
},
    
});

