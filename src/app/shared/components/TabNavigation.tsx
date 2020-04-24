import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/app/store.config';
import LoginScreen from '../../login/components/LoginScreen';
import ProfileRouter from '../../profile/ProfileRouter';
import IconWithBadge from './IconWithBadge';

interface Props {}

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC<Props> = (props: Props) => {
  const {number} = useSelector((state: RootState) => state.cart);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={(screenData: any) => {
          const {route} = screenData;
          return {
            tabBarIcon: (tabBarData: any) => {
              const {focused, color, size} = tabBarData;
              let iconName: any;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }

              return (
                <IconWithBadge
                  badgeCount={number}
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
        }}>
        <Tab.Screen name="Home" component={LoginScreen} />
        <Tab.Screen name="Profile" component={ProfileRouter} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(TabNavigation);
