import { StyleSheet } from "react-native";

const paginatorStyles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "white",
        marginHorizontal: 8,
    },
    paginatorView: { flexDirection: "row", height: 64,marginTop:20},
});

export default paginatorStyles;
