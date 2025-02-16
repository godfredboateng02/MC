import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorDialog = ({ isVisible, message, onClose, onConfirm }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Errore</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => {
              onClose(); // Chiude il dialogo
              onConfirm(); // Esegue l'azione personalizzata
            }}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(255, 136, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: 'white',
  },
});

export default ErrorDialog;