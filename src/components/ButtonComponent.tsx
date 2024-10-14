import React from 'react';
import { Button } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const ButtonComponent: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      onPress={onPress}
    />
  );
};

export default ButtonComponent;
