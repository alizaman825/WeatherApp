import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, FlatList, Alert, RefreshControl, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';



const openWeatherKey = `bcaa32d636503036ffd39248e6131d2f`;
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;



function Current() {
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [unitsSystem, setUnitsSystem] = useState('metric')
  const loadForecast = async () => {
    setRefreshing(true);

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    const location = await Location.getLastKnownPositionAsync({});
    const response = await fetch( `${url}&lat=${location.coords.latitude}&units=${unitsSystem}&lon=${location.coords.longitude}`);
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
    } else {
      setForecast(data);
    }

    setRefreshing(false);
  }

  useEffect(() => {
    loadForecast();
  }, [unitsSystem])

  if (!forecast) {
    return <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
      </SafeAreaView>;
  }
  

  const current = forecast.current.weather[0];

  
  return (<>
    
    <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {loadForecast() }} 
            refreshing={refreshing}
          />}
      >
  
        <View
        
        style={{marginTop:30}}>
          <FlatList
          style={{color:'white',alignSelf:'center',}}
          horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              return <View style={{backgroundColor:"#9BABFF",borderRadius:40,width:80,height:160,alignItems:"center",margin:10,borderWidth:1,borderColor:"white",}}>
                <Text style={{color:"white",paddingTop:15,fontSize:13,fontWeight:'200'}}>{dt.toLocaleTimeString().replace(/:\d+ /, ' ')}</Text>
               
                <Image
                  style={styles.smallIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                  }}
                />
                <Text style={{color:"white",fontSize:16,fontWeight:'300'}}>{Math.round(hour.item.temp)}°</Text>
              </View>
            }}
            />
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    title: {
      width: '100%',
      textAlign: 'center',
      fontSize: 36,
      fontWeight: 'bold',
      color: '#e96e50',
    },
    subtitle: {
      fontSize: 24,
      marginVertical: 30,
      marginLeft:20,
      color: 'white',
    },
    container: {
      flex: 1,
      
    },
    container2: {
      flex: 1,
      opacity:0.9,
      width:"95%",
      alignSelf:'center',
      borderRadius:20,
      marginTop:40,
      tintColor:"white",
      justifyContent:"center",
      
    },
    loading: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
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
      width: '100%',
      textAlign: 'center',
      fontWeight: '200',
      fontSize: 24,
      marginBottom: 5
    },
    hour: {
      padding: 6,
      alignItems: 'center',
      color:'white',
    },
    largeIcon: {
      width: 300,
      height: 250,
    },
    smallIcon: {
      width: 100,
      height: 100,
    },
    extraInfo: {
      flexDirection: 'row',
      marginTop: 20,
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
  });

export default Current
