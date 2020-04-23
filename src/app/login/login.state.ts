import {Action} from '../actions.config';

export interface LoginState {
  email: string;
  password: string;
  isLogged: boolean;
}

export const initiallLoginState: LoginState = {
  email: '',
  password: '',
  isLogged: false,
};

export const loginReducer = (
  state: LoginState = initiallLoginState,
  action: Action,
) => {
  switch (action.type) {
    case 'DEMO':
      return {...state};
    default:
      return {...state};
  }
};
