import React, {useEffect, useState} from 'react';
import SplashScreen from './src/pages/SplashScreen';
import Login from './src/pages/Login';
import Home from './src/pages/Home';
import DataSurat from './src/pages/DataSurat';
import {getData} from './src/storages/localStorage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './src/pages/Profile';
import SKtugas from './src/pages/SKtugas';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import DetailSurat from './src/pages/DetailSurat';
import DetailSKtugas from './src/pages/DetailSKtugas';
import PdfViewer from './src/pages/pdfViewer';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fc7426',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Octicons
              name="home"
              size={24}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Surat"
        component={DataSurat}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons
              name="mail-open-outline"
              size={27}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="SK tugas"
        component={SKtugas}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="assignment"
              size={27}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Ionicons
              name="person-outline"
              size={27}
              color={color}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [isSplash, setSplash] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);

    getData('auth').then(async res => {
      if (res) {
        setIsLogin(true);
      }
    });
  });

  return (
    <NavigationContainer initiaitedRouteName="SplashScreen">
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={MyTabs} options={{headerShown: false}}/>
        <Stack.Screen name="DataSurat" component={DataSurat} options={{headerShown: false}}/>
        <Stack.Screen name="SKtugas" component={SKtugas} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="DetailSurat" component={DetailSurat} options={{headerShown: false}}/>
        <Stack.Screen name="DetailSKtugas" component={DetailSKtugas} options={{headerShown: false}}/>
        <Stack.Screen name="pdfViewer" component={PdfViewer} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
