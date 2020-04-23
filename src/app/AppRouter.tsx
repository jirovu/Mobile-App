import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Tab} from './actions.config';
import CartScreen from './cart/components/CartScreen';
import HomeRouter from './home/HomeRouter';
import ProfileRouter from './profile/ProfileRouter';
import IconWithBadge from './shared/components/IconWithBadge';
import {RootState} from './store.config';

interface Props {}

const AppRouter: React.FC<Props> = (props) => {
  const {number} = useSelector((state: RootState) => state.cart);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={(screenData: any) => {
            const {route} = screenData;
            return {
              tabBarIcon: (tabBarData: any) => {
                const {color, size} = tabBarData;
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
