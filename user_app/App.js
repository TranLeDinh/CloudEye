import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Landing,
  Login,
  ForgotPassword,
  SendEmail,
  HomeScreen,
  Signup,
  SignupSuccessful,
  PersonalData,
  Settings,
  List,
  AboutUs,
  Feedbacks,
  Notification,
  ChangePassword,
  ChangeLimit,
} from './screens';

import {Tabs} from './components';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;