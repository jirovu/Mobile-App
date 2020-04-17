import React from 'react';
import { Text } from 'react-native';

interface Props {

}

const ProductScreen: React.FC<Props> = (props) => {
  return <>
    <Text>ProductScreen</Text>
  </>
}

export default React.memo(ProductScreen);
