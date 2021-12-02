
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import Sunset from '../../assets/sunset.png'
import Clouds from '../../assets/clouds.png'
import Sun from '../../assets/visibility.png'
import Moon from '../../assets/sun.png'



export default function Weather({ weatherData, fetchWeatherData }) {

    const { weather,
            visibility,
            weather: [{description, icon}],
            name,
            clouds : {all},
            main: { temp, humidity, feels_like,pressure,temp_max,temp_min },
            wind: { speed },
            sys: { sunrise, sunset,country },
    } = weatherData;
    const [{ main }] = weather;
    
    const [unitsSystem, setUnitsSystem] = useState('metric')
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`
    
    return (
      <>
      <ScrollView>
      <Text style={{textAlign:"center",color:"#D1D4E9",fontSize:24,fontWeight:"bold",padding:20}}>
          {name},{country}
         </Text> 
      <View style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
        
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
              <Text style={{color:"white",padding:6}}>{Math.round(feels_like)}°</Text>
          </View>
          
  
          <View style={{flexDirection:'row',paddingTop:20,}}>
          <Text style={{color:"white",padding:5,fontSize:14,}}>Humidity: </Text>
              <Text style={{color:'white',padding:6}}>{humidity}%</Text>
          </View>
        
          <View style={{flexDirection:'row',paddingTop:20,justifyContent:'space-around'}}>
          <Text style={{color:"white",paddingTop:5,paddingLeft:5,fontSize:14}}>Wind Speed: </Text>
              <Text style={{color:'white',paddingTop:6}}>{speed}</Text>
          </View>
        
           <View style={{flexDirection:'row',paddingTop:20,paddingBottom:30,justifyContent:'space-around'}}>
           <Text style={{color:"white",fontSize:14,paddingTop:5,paddingLeft:5}}>Pressure: </Text>
              <Text style={{color:"white",paddingTop:6}}>{pressure} hPa</Text>
           </View>
          </View>
          
          </View>
          <View style={{width:'95%'}}>
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
          <Image source={Moon} />
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

</ScrollView>
      </>
    )
}

const styles = StyleSheet.create({
  weatherDetails: {
    width:'98%',
    borderRadius:10,
    opacity:0.9,
    alignSelf:"center",
    marginBottom:50,
    paddingTop:20,
    marginTop:50,
 
   },
    container: {
      flex: 1,
      marginTop:50,
      
    },
    backgroundImg: {
        flex: 1,
       
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 0,
        justifyContent: 'space-between',
        padding: 10
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center'
    },
    largeIcon: {
        width: 250,
        height: 200,
      },
      current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
      },
      currentTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      currentDescription: {
        textAlign:'center',
        fontSize:24,
        fontWeight:'bold',
        marginBottom:10
      },
      title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        color: '#e96e50',
      },
      cityname:{
        fontSize:18,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
    

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
});