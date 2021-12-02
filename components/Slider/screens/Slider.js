import React from "react";
import { View, Text } from "react-native";

import { StatusBar } from "expo-status-bar";

// Components
import Slider from "../components/Slider/Slider";

// StyleSheets
import globalStyles from "../styles/globalStyles";
import Paginator from "../components/Paginator/Paginator";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Carousel({navigation}) {
    // Extract style from styleSheet
    const { container, brandName } = globalStyles;
    return (
        <>
           
            <View style={{justifyContent:'center',flex:1,width:"100%"}}>    
                <Slider navigation={navigation} />
                <StatusBar style="auto" />
            </View>
        </>
    );
}
