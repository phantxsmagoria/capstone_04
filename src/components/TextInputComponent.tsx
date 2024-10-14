import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TextInputComponent;
