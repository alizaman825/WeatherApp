import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import { NavigationContainer , DarkTheme } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


import { TouchableOpacity } from 'react-native-gesture-handler';



import Current from './components/hourlyForecast/Forecast';
import CityWise from './components/search/CityWise';
import Carousel from './components/Slider/screens/Slider';
import CurrentLocation from './CurrentLocation';


const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();


function CustomDrawerContent(props) {
  
  return (
    <DrawerContentScrollView {...props}>
      <View >
        
      </View>
    </DrawerContentScrollView>
  );
}

function MyDrawer({ navigation }) {
  return (
    <>
      <Drawer.Navigator >
        <Drawer.Screen name="Home" component={Carousel}  />
        <Drawer.Screen name="Current Location" component={CurrentLocation} />
        <Drawer.Screen name="Search By City" component={CityWise} />
      </Drawer.Navigator>
    </>
  );
}

export default function App() {
  
  return (
    
    <NavigationContainer >
      <MyDrawer />
    </NavigationContainer>
    
  );
}

 

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
   
  },
  menuItemsCard: {
   
    marginTop:50,
    marginLeft:50,
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
    marginTop:40,
  },
});

