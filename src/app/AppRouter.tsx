import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from './actions.config';
import CartScreen from './cart/components/CartScreen';
import { db } from './firebase.config';
import HomeRouter from './home/HomeRouter';
import { loginAction } from './login/login.actions';
import { LoginState } from './login/login.state';
import ProfileRouter from './profile/ProfileRouter';
import IconWithBadge from './shared/components/IconWithBadge';
import { RootState } from './store.config';

interface Props { }

const AppRouter: React.FC<Props> = (props) => {
  const { number } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    AsyncStorage.getItem('user').then((user: any) => {
      const email = user.split(':')[0];
      const password = user.split(':')[1];
      dispatch(loginAction.login({ email, password, isLogged: true }));
    })
  }, []);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={(screenData: any) => {
            const { route } = screenData;
            return {
              tabBarIcon: (tabBarData: any) => {
                const { color, size } = tabBarData;
                let iconName: any;
                let badgeCount: number = 0;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'User') {
                  iconName = 'user';
                } else {
                  iconName = 'shopping-cart';
                  badgeCount = number;
                }

                return (
                  <IconWithBadge
                    badgeCount={badgeCount}
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              },
            };
          }}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
          initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeRouter} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="User" component={ProfileRouter} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default React.memo(AppRouter);
