import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

type PopupProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ visible, message, onClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <Text style={styles.popupMessage}>{message}</Text>
          <TouchableOpacity style={styles.popupButton} onPress={onClose}>
            <Text style={styles.popupButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

//Dejé los styles acá para no llenar el styles . ts

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  popupMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  popupButton: {
    backgroundColor: '#FA7929',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  popupButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Popup;
