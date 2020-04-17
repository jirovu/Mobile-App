import { Action as ReduxAction } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


/**
 * -------------------------
 * Global Action
 * -------------------------
 */
export interface Action extends ReduxAction {
  payload?: any
}

export const Stack = createStackNavigator();
export const Tab = createBottomTabNavigator();
