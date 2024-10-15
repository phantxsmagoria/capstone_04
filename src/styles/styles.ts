import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#ff5722',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#ff5722',
    textDecorationLine: 'underline',
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
    marginBottom:10,
    color: '#333',
  },
  buttonContainer:{
    flexDirection: "row",
    marginTop:700,
    borderWidth:2,
    width:"80%",
    height:60,
    borderRadius:100,
    borderColor: '#ff5722',
    alignItems:"center",
    marginLeft:30,

  },
  loginButtonWrapper:{
    justifyContent:"center",
    alignItems:"center",
    width:"90%",
    backgroundColor: '#ff5722',
    borderRadius: 98,
    height:"100%",

  },

  loginButtonText: {
    color: '#000',
    fontSize: 18,
    marginLeft:60,
    
  },
  
  registerButtonText: {
    color: '#white',
    fontSize: 18,
  },
  registerButtonWrapper:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#ff5722',
    borderRadius: 98,

  },



  
});
