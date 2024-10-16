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
     // Ajustamos el margen para que esté más arriba
  },

  titleRegister: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -200,
    marginLeft: -86,
    marginBottom: 80,
     // Ajustamos el margen para que esté más arriba
  },

  titleRegisterCliente: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -100,
    marginLeft: -120,
    marginBottom: 80,
     // Ajustamos el margen para que esté más arriba
  },

  inputRegister: {
    width: '80%',
    height: 50,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
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
    borderWidth: 0, // Aseguramos que no haya borde cuando está enfocado
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
    top: 10,
    right: 10,
    zIndex: 1,
  },
  pCliente: {
    marginTop: -80,
    marginRight: 275,
    marginBottom: 30,
  }
});
