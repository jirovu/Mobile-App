import { Dispatch } from 'redux';
import { loginActionCreator, LoginState } from './login.state';
import { AsyncStorage } from 'react-native';

class LoginAction {
  login = (user: LoginState) => {
    AsyncStorage.setItem('user', `${user.email}:${user.password}`);
    return {
      type: loginActionCreator.LOGIN,
      payload: user
    }
  }

  logout = () => {
    return (dispatch: Dispatch<any>, getState: any) => {
      const currentUser = getState().login;
      AsyncStorage.removeItem('user');
      dispatch({
        type: loginActionCreator.LOGOUT
      });
    }
  }
}

export const loginAction = new LoginAction();
