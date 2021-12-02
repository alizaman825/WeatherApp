import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Location from 'expo-location'
import UnitsPicker from './components/UnitsPicker/UnitsPicker'
import WeatherDetails from './components/WeatherDetails/WeatherDetails'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import { colors } from './utils/index'

import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'


// API Key
const API_KEY = 'edf342a0de686941615db6036bf724d2'
const URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function CurrentLocation() {

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("Your Location Maybe Turned Off Try Turning It and Refresh!")
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')
  const [loading, setLoading] = useState(false);
  
  

  const load = async () => {
    setCurrentWeather(null)
    setErrorMessage(null)

    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage("Need access to the location in order to run the App")
        return
      }
      const location = await Location.getLastKnownPositionAsync();
      setLocation(location)
      const { latitude, longitude } = location.coords
      const weatherUrl = `${URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${API_KEY}`

      const response = await fetch(weatherUrl)

      const result = await response.json()

      // alert(`Latitude is ${latitude} and Longitude is ${longitude}`)
      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  
  useEffect(() => {
    load()
  }, [unitsSystem])

 
  
  if (currentWeather) {
    return (
      <>
 
 <LinearGradient  colors={['#5C76FE', '#647CFE','#6880FE',"#6D84FE",'#7389FE',"#7B90FE","#8296FE","#A4B3FF"]} style={{width:"100%",height:"100%"}} >
      <ScrollView>
      <View style={{ margin:20, width: "18%" }}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>load()} style={styles.searchBtn} >
              {loading ? (<Ionicons name="reload"/>) : (<Ionicons name="reload" size={22} color='white'/>)}
            </TouchableOpacity>
          </View>
        <View style={{backgroundColor:"#32333E",borderRadius:16,margin:20,borderWidth:1,borderColor:"white"}}>
          <Text style={{textAlign:'center',padding:10,color:'white'}}>
            {Date()}
          </Text>
         </View> 
        <View  style={{justifyContent:"center",flexDirection:'row'}}>
          <View style={{marginTop:10}}>
        <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
        </View>
        
       </View> 
          <WeatherInfo currentWeather={currentWeather} />

          <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />

          </ScrollView>
      </LinearGradient>
    
      </>
    )
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
         <View style={{ margin:20, width: "18%" ,flex:1,justifyContent:"center"}}>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>load()} style={styles.searchBtn} >
              {loading ? (<Ionicons name="reload"/>) : (<Ionicons name="reload" size={22} color='black'/>)}
            </TouchableOpacity>
          </View>
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={{alignSelf:'center',justifyContent:'center',flex:1,}}>
      
        <ActivityIndicator size="large" />
        <StatusBar style="auto" />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  main: {
    
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.PRIMARY_COLOR,
    paddingBottom: 20,
  },
  searchBtn: {
   
},
});
