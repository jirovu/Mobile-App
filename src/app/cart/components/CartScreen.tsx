import React from 'react';
import {Text} from 'react-native';

interface Props {}

const CartScreen: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Text>This is cart</Text>
    </>
  );
};

export default React.memo(CartScreen);
