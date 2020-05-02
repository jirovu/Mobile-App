import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Product } from '../../cart/cart.state';
import Chevron from '../../shared/components/Chevron';

interface Props {
  product: Product,
  isCart?: boolean
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
    marginBottom: 15,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 20,
    color: 'gray',
    fontWeight: '500',
  },
});

const ProductItem: React.FC<Props> = ({ product, isCart }) => {
  const nav = useNavigation();

  return <>
    <View>
      <ListItem
        title={product.name}
        containerStyle={styles.listItemContainer}
        onPress={() => nav.navigate(isCart ? 'Cart' : 'Home', {
          screen: isCart ? 'Cart Detail' : 'Home Detail', params: {
            id: product.id,
            name: product.name,
            price: product.price,
            url: product.url,
            description: product.description,
            isCart: isCart ? true : false
          }
        })}
        rightIcon={<Chevron />}
        leftAvatar={{ source: { uri: product.url } }}
      />
    </View>
  </>
}

export default React.memo(ProductItem);
