import React from 'react'
import { View,Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {colors} from '../../utils/index'

export default function ReloadIcon({load}) {
    const reloadIconName = Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'
    return (
        <View style = {{margin:30}}>
            <Ionicons onPress = {load} name={ reloadIconName } size={24} color='white'  />
        </View>
    )
}

// Styles
const styles = StyleSheet.create({
    reloadIcon : {
        top: 60,
        right: 30,


    }
})
