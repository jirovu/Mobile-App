import React from 'react';
import { Text } from 'react-native-elements';

interface Props {

}

const ProductDetail: React.FC<Props> = (props: Props) => {
  return <>
    <Text>This is the Product Detail</Text>
  </>
}

export default React.memo(ProductDetail);
