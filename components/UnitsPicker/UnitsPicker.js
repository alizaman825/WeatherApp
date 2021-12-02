import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import {Picker} from '@react-native-picker/picker';

export default function UnitsPicker({unitsSystem, setUnitsSystem,}) {
    return (
        <View style={{marginTop:30,marginLeft:20}}>
            <Picker
                selectedValue={unitsSystem}
                onValueChange={(item) => setUnitsSystem(item)}
                mode="dialog"
                itemStyle={{ fontSize: 15,maxHeight:100 }}
                style={{width:100,borderColor:"white",borderWidth:1,height:80,borderRadius:20}}
                
            >
                <Picker.Item label="C°" value="metric"  color="white" />
                <Picker.Item label="F°" value="imperial" color="white" />
            </Picker>
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    
})
