import React from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";

// StyleSheets
import globalStyles from "../../styles/globalStyles";
import sliderItemStyle from "../../styles/SliderItemStyles";



const SliderItem = ({ item }) => {
    // Extract styles from styleSheets
    const { container } = globalStyles,
        {  sliderImage, flexViewHalf, sliderItem } = sliderItemStyle;


    // Get window width and height
    const { width } = useWindowDimensions();
   
    return (
        <View style={{justifyContent:"center",flexDirection:"column",alignItems:'center',marginTop:30}}>
            {/* Slider Image */}
            <Image
                source={item.images}
                style={{flex:1,alignSelf:'center'}}
            />
            <View style={{alignItems:'center',width:width,justifyContent:"center"}}>
            <Text style={{textAlign:'center',color:'white',fontSize:24,fontWeight:'bold',paddingTop:30}}>
                {item.title}
            </Text>
            <Text style={{textAlign:'center',color:"white",fontSize:16,fontWeight:'200',paddingTop:20,width:"99%"}}>
                {item.description}
            </Text>
            </View>      
        </View>
    );
};

export default SliderItem;
