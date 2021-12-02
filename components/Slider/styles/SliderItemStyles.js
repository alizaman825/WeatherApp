import { StyleSheet } from "react-native";

const sliderItemStyles = StyleSheet.create({
    sliderItem: {
        height:'100%',


    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        color: "black",
        textAlign: "center",
    },
    sliderImage: {
        resizeMode: "cover",
        justifyContent: "center",
        flex: 1,
        alignSelf:'center',
    },
    flexViewHalf: { flex: 0.5, },
});

export default sliderItemStyles;
