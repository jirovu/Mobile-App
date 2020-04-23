import React from 'react';
import {Text} from 'react-native';

interface Props {}

const HomeScreen: React.FC<Props> = () => {
  return (
    <>
      <Text>ProductScreen</Text>
    </>
  );
};

export default React.memo(HomeScreen);
