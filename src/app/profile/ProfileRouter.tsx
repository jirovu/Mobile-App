import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '../actions.config';
import LoginScreen from '../login/components/LoginScreen';
import RegisterScreen from '../login/components/RegisterScreen';
import { RootState } from '../store.config';
import ProfileScreen from './components/ProfileScreen';
import ChangePasswordScreen from '../login/components/ChangePasswordScreen';

interface Props {

}


const ProfileRouter: React.FC<Props> = (props) => {

  const { isLogged } = useSelector((state: RootState) => state.login);
  const nav = useNavigation();
  const initRoute = isLogged ? 'Profile' : 'Login';

  const guestRoutes = [
    <Stack.Screen key='login' name="Login" component={LoginScreen} options={{ headerShown: false }} />,
    <Stack.Screen key='register' name="Register" component={RegisterScreen} options={
      {
        headerLeft: (props) => <HeaderBackButton onPress={() => nav.navigate('User', { screen: 'Login' })} />
      }
    } />
  ];

  const userRoutes = [
    <Stack.Screen key='profile' name="Profile" component={ProfileScreen} options={{ headerShown: false }} />,
    <Stack.Screen key='change-password' name="Change Password" component={ChangePasswordScreen} options={
      {
        headerLeft: (props) => <HeaderBackButton onPress={() => nav.navigate('User', { screen: 'Profile' })} />
      }
    } />
  ]

  return <>
    <Stack.Navigator initialRouteName={initRoute}>
      {!isLogged ? userRoutes : guestRoutes}
    </Stack.Navigator>
  </>
}

export default React.memo(ProfileRouter);
