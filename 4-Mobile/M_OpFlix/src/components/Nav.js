import React, { Component } from "react";
import { SafeAreaView, Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";

class Nav extends Component{
    render(){
        return (
            <View style={styles.navContainer}>
                <View style={styles.logo}>
                    <Image source={require("../assets/img/icon-logo.png")} style={{ width: 50, height: 50 }} />
                    <Text style={styles.textoLogo}>OpFlix</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require("../assets/img/menu-icon.png")} style={{ width: 40, height: 40 }} />
                </TouchableOpacity>
            </View>
        )
    }
        
}

const styles = StyleSheet.create({
    navContainer: {
        backgroundColor: "#A60313",
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
        height: 70,
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
    },
    textoLogo: {
        color: "#fff",
        fontSize: 30,
        fontWeight : "bold"
    }
})

export default Nav;