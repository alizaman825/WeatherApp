import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../utils/index';
import Sun from '../../assets/sun.png'
const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

const WeatherDetails = ({ currentWeather, unitsSystem }) => {
  console.log(currentWeather)
  const {
    main: { feels_like, humidity, pressure },
    wind: { speed },
    sys :{sunrise,sunset,country}
   
  } = currentWeather;

  const { 
    weather: [details],
} = currentWeather;
const {icon,main,description} = details

const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

  const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`;
  return (
    <View>
      <View 
      style={{ width:'95%',
      borderRadius:10,
      backgroundColor:'#7187FD',
      opacity:1,
      marginTop:50,
      alignSelf:"center",
      marginBottom:50}}
      >
          <View>
            <Text style={{color:'white',fontSize:25,paddingLeft:20,paddingTop:20,fontWeight:"bold",}}>
              Details
            </Text>
          </View>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:"97%"}}>
          <View style={{alignSelf:'center'}}>
          <Image style = {{width:170,height:180,tintColor:"white",}}  source ={{uri : iconUrl}} />
          </View>
          <View style={{flexDirection:'column'}}>     
             
            <View style={{flexDirection:'row',paddingTop:30,justifyContent:"space-around"}}>
          <Text style={{color:'white',padding:5,fontSize:14}}>Feels like: </Text>
              <Text style={{color:"white",padding:6}}>{Math.round(feels_like)}°C</Text>
          </View>
          
  
          <View style={{flexDirection:'row',paddingTop:20,}}>
          <Text style={{color:"white",padding:5,fontSize:14,}}>Humidity: </Text>
              <Text style={{color:'white',padding:6}}>{humidity}%</Text>
          </View>
        
          <View style={{flexDirection:'row',paddingTop:20,justifyContent:'space-around'}}>
          <Text style={{color:"white",paddingTop:5,paddingLeft:5,fontSize:14}}>Wind Speed: </Text>
              <Text style={{color:'white',paddingTop:6}}>{windSpeed}</Text>
          </View>
        
           <View style={{flexDirection:'row',paddingTop:20,paddingBottom:30,justifyContent:'space-around'}}>
           <Text style={{color:"white",fontSize:14,paddingTop:5,paddingLeft:5}}>Pressure: </Text>
              <Text style={{color:"white",paddingTop:6}}>{pressure} hPa</Text>
           </View>
          </View>
          
          </View>
          <View style={{width:'97%'}}>
            <Text style={{fontSize:16,fontWeight:'200',color:'white',padding:20}}>
            Today - {main}. Winds from SW to SSW at {speed} mph . The overnight low will be {Math.round(feels_like)} ° C
            </Text>
          </View>
</View>
         <View style={{ width:'95%',
      borderRadius:10,
      backgroundColor:'#7187FD',
      opacity:1,
      marginTop:20,
      alignSelf:"center",
      marginBottom:50,
      
      }}>
        <View>
          <Text  style={{color:'white',fontSize:25,paddingLeft:20,paddingTop:20,fontWeight:"bold",}}>Sun & Moon</Text>
        </View>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:50,marginBottom:30}}>
          <View>
          <Text style={{fontSize:16,fontWeight:'200',color:"white",paddingTop:20}}>
            {new Date(sunrise*1000).toLocaleTimeString()}
          </Text>
          <Text style={{fontSize:16,fontWeight:'200',color:"white",paddingTop:10}}>
            Sunrise
          </Text>
          </View>
          <Image source={Sun} />
          <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:16,fontWeight:'200',color:"white",paddingTop:20}}>
            {new Date(sunset*1000).toLocaleTimeString()}
          </Text>
          <Text style={{fontSize:16,fontWeight:'200',color:"white",paddingTop:10}}>
            Sunset
          </Text>
          </View>
        </View>
         </View>



    </View>
  );
}

export default WeatherDetails;

// Styles
const styles = StyleSheet.create({
  weatherDetails: {
  

  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailsBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailsItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    color: SECONDARY_COLOR,
    fontWeight: '700',
    margin: 7,
  },
})