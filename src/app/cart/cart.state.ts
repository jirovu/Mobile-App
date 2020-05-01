import { Action } from '../actions.config';

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
    case 'HELLO':
      return { ...state };
    default:
      return { ...state };
  }
};
