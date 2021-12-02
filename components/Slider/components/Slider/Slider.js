import React, { useState, useRef, useEffect } from "react";
import { View, FlatList, Animated, Text, TouchableOpacity } from "react-native";

// Components
import SliderItem from "../SliderItem/SliderItem";
import Paginator from "../Paginator/Paginator";
import ScrollButton from "../ScrollButton/ScrollButton";
// StyleSheets
import sliderStyles from "../../styles/SliderStyles";
import globalStyles from "../../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Background1 from '../../../../assets/background1.png'
import Background2 from '../../../../assets/background2.png'
import Background3 from '../../../../assets/background3.png'
import Background4 from '../../../../assets/background4.png'
import NextButton from "../ScrollButton/ScrollButton";
import { LinearGradient } from "expo-linear-gradient";
export default function Slider({navigation}) {

    const Data = [
        {id:"1",title:'Detailed Hourly Forecast',description:"Get in - depth weather information.",images:Background1},
        {id:"2",title:'Real-Time Weather Map',description:"Watch the progress of the precipitation to stay informed",images:Background2},
        {id:"3",title:'Weather Around the World',description:"Add any location you want and swipe easily to chnage.",images:Background3},
        {id:"4",title:'Detailed Hourly Forecast',description:"Get in - depth weather information.",images:Background4}
    ]
    // Extract styles from the stylesheets
    const { container } = globalStyles,
        { flexView } = sliderStyles;

    // Initial states of slide index and slides
    const [currentIndex, setCurrentIndex] = useState(0),
        [slides, setSlides] = useState([]),
        [value, setValue] = useState("");

    // Refs
    const scrollX = useRef(new Animated.Value(0)).current,
        slidesRef = useRef(null),
        onViewableItemsChanged = useRef(({ viewableItems }) => {
            // If items change change the current index of the slides
            setCurrentIndex(viewableItems[0].index);
        }).current;

    // Sets the index to AsyncStorage
    const setLastIndexToStorage = async (index) => {
        if (currentIndex >= 0) {
            try {
                await AsyncStorage.setItem(
                    "@lastViewedIndex",
                    index.toString()
                );
            } catch {
                alert("Some error occurred!!");
            }
        }
    };

    // Function to move the slider to the next slide
    const ScrollToNext = async () => {
        // If there are one or more slides left to go, increment the current index by 1
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
        if (currentIndex >= 0) {
            setLastIndexToStorage(currentIndex + 1);
        }
    };

    // Function to move the slider to the previous slide
    const ScrollToPrevious = () => {
        // If there are one or more slides left to go back, decrement the current index by 1
        if (currentIndex > 0) {
            slidesRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
        if (currentIndex >= 0) {
            setLastIndexToStorage(currentIndex - 1);
        }
    };

    // Get the index that was lastly viewed the last time the app closed
    useEffect(() => {
        (async () => {
            try {
                const lastViewedIndex = await AsyncStorage.getItem(
                    "@lastViewedIndex"
                );

                // If the last viewed index was set
                if (lastViewedIndex) {
                    setValue(lastViewedIndex);
                }
            } catch (err) {
                alert("Some error occurred!!");
            }
        })();
    }, []);

    // Fetch data from endpoint on server
    useEffect(() => {
        setSlides(Data);
    }, []);

    return (
        <>
            {/* Show the slider after the data is loaded from the server */}
            {slides[0] ? (
                <LinearGradient  colors={['#5C76FE', '#647CFE','#6880FE',"#6D84FE",'#7389FE',"#7B90FE","#8296FE","#A4B3FF"]} style={container}>
                  
                    <View style={flexView}>
                        {/* Slider */}
                        <FlatList
                            data={slides}
                            renderItem={ ({ item,index }) => (
                                <SliderItem
                                    key={index}
                                    item={item}
                                />
                                
                                
                            )}
                            
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            onScrollToIndexFailed={info => {
                                const wait = new Promise(resolve => setTimeout(resolve, 500));
                                wait.then(() => {
                                  flatList.current?.scrollToIndex({ index: info.index, animated: true });
                                });
                              }}
                            initialScrollIndex={parseInt(value)}
                            pagingEnabled
                            bounces={false}
                            keyExtractor={(item) => item.id}
                            onScroll={Animated.event( 
                                [
                                    {
                                        nativeEvent: {
                                            contentOffset: { x: scrollX },
                                        },
                                    },
                                ],
                                {
                                    useNativeDriver: false,
                                }
                            )}
                            scrollEventThrottle={32}
                            onViewableItemsChanged={onViewableItemsChanged}
                            ref={slidesRef}
                        />  
                        
                    </View>

                    {/* Paginator with dots */}
                  

                                         
                    <Paginator data={slides} scrollX={scrollX} />
                    {/* Scroll Buttons */}
                    <TouchableOpacity style={{}} onPress={()=>navigation.navigate("Current Location")}>
                    <Text style={{color:"white",}}>
                        Skip
                    </Text>
                </TouchableOpacity> 

                    <View
                        style={{flex:1,width:'100%',display:"flex",flexDirection:"row",}} >
                        
                        {/* Scroll to previous button */}
                        
                        {/* Scroll to next button */}
                        <ScrollButton
                            slidesLength={slides.length}
                            currentIndex={currentIndex}
                            direction="next"
                            scrollToNext={ScrollToNext}
                            percentage={
                                (currentIndex + 1) * (100 / slides.length)
                                
                            }
                        />
                    </View>
                    
                </LinearGradient>
            ) : (
                // Show when the data loads from the server
                <Text>Loading...</Text>
            )}
        </>
    );
}
