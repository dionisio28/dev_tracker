import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from '../screens/SearchScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{
            title: 'Dev Tracker',
          }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={{
            title: 'Detalhes do usuário',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
