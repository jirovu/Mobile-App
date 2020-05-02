import { AsyncStorage } from 'react-native';
import { Action } from '../actions.config';

export const cartActionCreator = {
  ADD_TO_CART: 'ADD_TO_CART',
  UPDATE_CART: 'UPDATE_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART'
}

export interface Product {
  id: number;
  name: string;
  url: string;
  price: any;
  description: string;
}

export interface CartState {
  carts: Product[];
  number: number;
}

const initialCartState: CartState = {
  carts: [],
  number: 0,
};

export const cartState = (state: CartState = initialCartState, action: Action) => {
  switch (action.type) {
    case cartActionCreator.ADD_TO_CART: {
      const product = action.payload as Product;
      const newCarts = [...state.carts];
      newCarts.push(product);
      AsyncStorage.setItem('carts', JSON.stringify(newCarts));
      const number = newCarts.length;

      return { ...state, carts: newCarts, number };
    }
    case cartActionCreator.UPDATE_CART: {
      const carts = action.payload.carts as Product[];
      const number = action.payload.number as number;

      return { ...state, carts, number }
    }
    case cartActionCreator.REMOVE_FROM_CART: {
      const carts = action.payload.newCarts as Product[];
      const number = action.payload.number as number;
      return { ...state, carts, number }
    }
    default:
      return { ...state };
  }
};
