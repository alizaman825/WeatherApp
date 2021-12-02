import React, { useEffect, useState, } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ImageBackground, Image } from 'react-native';
import Weather from './Weather';

import { ScrollView } from 'react-native-gesture-handler';
import NotFound from '../../assets/notfound.png'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const API_KEY = `bcaa32d636503036ffd39248e6131d2f`;



function CityWise() {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const [location, setLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [loading, setLoading] = useState(false);

    async function fetchWeatherData(e) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${e.structured_formatting.main_text}&units=${unitsSystem}&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if(response.status == 200) {
                const data = await response.json();
                // console.log(data);
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      load()
    }, [unitsSystem])

    const load = async () => {
      setCurrentWeather(null)
      setErrorMessage(null)
      setLoaded(false);
      const API = `https://api.openweathermap.org/data/2.5/weather?&units=${unitsSystem}&appid=${API_KEY}`
      try {
          const response = await fetch(API);
          console.log(response)
          if(response.status == 200) {
              const data = await response.json();
              console.log(data)
              setWeatherData(data);
              
          } else {
              setWeatherData(null);
          }
          setLoaded(true);
          
      } catch (error) {
          console.log(error);
      }
  }
    
  
    

    if(!loaded) {
        return (
            
            <View style={{justifyContent:"center"}}>
                <ActivityIndicator color='gray'  size={36} />
            </View>
            

        )
    }

    else if(weatherData === null) {
        return (
            
            <LinearGradient  colors={['#5C76FE', '#647CFE','#6880FE',"#6D84FE",'#7389FE',"#7B90FE","#8296FE","#A4B3FF"]} style={{height:"100%"}}   >
                <View style={{width:'90%',marginTop:40,alignSelf:'center',height:'40%'}}>
            <GooglePlacesAutocomplete
             placeholder="Search"
  
             minLength={1} // minimum length of text to search
             autoFocus={false}
  
             onPress={(e) => {fetchWeatherData(e)}}
 
             query={{
    // available options: https://developers.google.com/places/web-service/autocomplete
    key: 'AIzaSyB7r-ve5mdLfFUeSKkefzUQ2KcxugmxMwQ',
    language: 'en', // language of the results
    type:'(cities)'
  
  }}
  
  
/>
</View>
            <View style={{flexDirection:'column',justifyContent:'center',}}>
                <View>
                <Image source={NotFound} style={{alignSelf:'center'}} />
                </View>
                <View>
            <Text style={styles.primaryText}>We couldn't retrieve data try searching another city!</Text>
            </View>
            </View>
            </LinearGradient>
          
        )
    }

    return (
        <>
         <LinearGradient  colors={['#5C76FE', '#647CFE','#6880FE',"#6D84FE",'#7389FE',"#7B90FE","#8296FE","#A4B3FF"]} style={{height:'100%'}}>
        <View style={{width:'90%',marginTop:40,alignSelf:'center',height:100}}>
       <GooglePlacesAutocomplete
         placeholder="Search"
         minLength={1} 
        autoFocus={false}  
         onPress={(e) => {fetchWeatherData(e)}}
           query={{
             key: 'AIzaSyB7r-ve5mdLfFUeSKkefzUQ2KcxugmxMwQ',
             language: 'en',
             type:'(cities)'}}/>
         </View> 
        <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}  />
        </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:2,
      alignItems: 'center',
      justifyContent: 'center',

    },
    primaryText: {
        fontSize: 18,
        color:"white",
        padding:30,
        textAlign:'center',
        
    }
  });

export default CityWise
