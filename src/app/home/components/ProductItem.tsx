import React from 'react';
import { Product } from '../../cart/cart.state';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/app/store.config';
import Chevron from '../../shared/components/Chevron';
import { loginAction } from '../../login/login.actions';
import { generateSnackbar } from '../../login/components/RegisterScreen';
import { useNavigation } from '@react-navigation/native';

interface Props {
  product: Product
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

const ProductItem: React.FC<Props> = ({ product }) => {
  const nav = useNavigation();

  return <>
    <View>
      <ListItem
        title={product.name}
        containerStyle={styles.listItemContainer}
        onPress={() => nav.navigate('Home', { screen: 'Detail' })}
        rightIcon={<Chevron />}
        leftAvatar={{ source: { uri: product.url } }}
      />
    </View>
  </>
}

export default React.memo(ProductItem);
