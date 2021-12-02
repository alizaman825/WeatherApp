import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Current from '../hourlyForecast/Forecast';
import Sunset from '../../assets/sunset.png'
import Clouds from '../../assets/clouds.png'
import Sun from '../../assets/visibility.png'


export default function WeatherInfo({currentWeather}) {

    const { 
    main:{temp,temp_min,temp_max,feels_like, humidity, pressure},
    wind:{speed},
    weather: [details],
    clouds : {all},
    name,
    sys :{sunrise,sunset,country}
} = currentWeather;
const {icon, main, description} = details

const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`





    return (
        <>
        <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:30}}>
            <View>
            <Image style = {{width: 152, height: 95,tintColor:"white",}} source ={{uri : iconUrl}} />
            </View>
            <View>
            <Text style={{color:"#D1D4E9",fontSize:70,fontWeight:'bold'}}>{Math.round(temp)}°</Text>
            <Text style={{textAlign:'center',color:'#FFFFFF',fontSize:15,fontWeight:"300"}}>{main}</Text>
            </View>
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:"space-around",alignItems:'center',marginTop:20}}>
            <Text style={{color:'white',fontSize:13,fontWeight:'200',}}>
             Feels Like &nbsp;{Math.round(feels_like)}°C
            </Text>
            <Text style={{color:'white',fontSize:13,fontWeight:'200',}}>
            |
            </Text>
            <Text style={{color:'white',fontSize:13,fontWeight:'200',}}>
                Wind &nbsp;{speed}&nbsp;KM/H WSW
            </Text>
        </View>
        <View style={{display:'flex',flexDirection:'row',marginTop:20,justifyContent:'space-around',}}>
            <View style={{display:"flex",flexDirection:'row'}}>
                <Image source={Clouds} style={{width:15,height:15}}/>
                
                <Text style={{color:'white',fontSize:13,fontWeight:'200',paddingLeft:10}}>
                   Precipitaion: &nbsp;{all} &nbsp;%
                </Text>
            </View>
            <View style={{display:"flex",flexDirection:'row'}}>
                <Image source={Clouds} style={{width:15,height:15}}/>
                
                <Text style={{color:'white',fontSize:13,fontWeight:'200',paddingLeft:10}}>
                   Humidity: &nbsp;{humidity} &nbsp;%
                </Text>
            </View>
        </View>
        <View style={{display:'flex',flexDirection:'row',marginTop:20,justifyContent:'space-around',}}>
            <View style={{display:"flex",flexDirection:'row'}}>
                <Image source={Sun} style={{width:15,height:15}}/>
                
                <Text style={{color:'white',fontSize:13,fontWeight:'200',paddingLeft:10}}>
                   Wind: &nbsp;{speed} &nbsp;km/h
                </Text>
            </View>
            <View style={{display:"flex",flexDirection:'row'}}>
                <Image source={Sunset} style={{width:15,height:15}}/>
                
                <Text style={{color:'white',fontSize:13,fontWeight:'200',paddingLeft:10}}>
                   Sunset: &nbsp;{new Date(sunset*1000).toLocaleTimeString()} &nbsp;
                </Text>
            </View>
        </View>
            <View>
            <Current/>
            </View>

            
        
        </>
    )
}

// Styles
const styles = StyleSheet.create({
    cityname:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        paddingTop:40
    

    },
    weatherInfo: {
        
        
    },
    weatherIcon: {
        width: 100,
        height: 80,
        tintColor:"white",
        alignSelf:'center'
    },
    textPrimary: {
        fontSize:80,
        color:"white",
        textAlignVertical:'bottom',
        paddingLeft:20,
        textAlign:'center',


    },
    texSecondary: {
        fontSize: 20,
        fontWeight: '500',
        color:'white',
        paddingTop:20
    
    },
})