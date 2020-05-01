import { Action } from './../actions.config';
import { Product } from "../cart/cart.state";

export const homeActionCreator = {
  GET_PRODUCT: 'GET_PRODUCT',
}

export interface ProductState {
  product: Product[];
}

const initialCartState: ProductState = {
  product: [],
};

export const homeState = (state: ProductState = initialCartState, action: Action) => {
  switch (action.type) {
    case homeActionCreator.GET_PRODUCT: {
      return { ...state, product: action.payload };
    }
    default:
      return { ...state };
  }
};
