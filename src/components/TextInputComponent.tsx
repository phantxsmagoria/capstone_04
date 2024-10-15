import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import styles from '../styles/styles'

interface Props {
  placeholder: string;
  secureTextEntry?: boolean;
}

const TextInputComponent: React.FC<Props> = ({ placeholder, secureTextEntry = false }) => {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  );
};


export default TextInputComponent;
