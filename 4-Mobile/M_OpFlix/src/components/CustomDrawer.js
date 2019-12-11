import React, { Component } from "react";
import { DrawerItems } from "react-navigation-drawer";

import {
    View,
    SafeAreaView,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Dimensions
} from "react-native"
// import { ScrollView } from "react-native-gesture-handler";


_fazerLogout = async (props) => {
    await AsyncStorage.removeItem("@opflix:token");
    props.navigation.navigate("")
}


customDrawer = (props) => {

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.flexMenu}>
                    <View>
                        <View style={styles.navContainer}>
                            <View style={styles.logo}>
                                <Image source={require("../assets/img/icon-logo.png")} style={{ width: 50, height: 50 }} />
                                <Text style={styles.textoLogo}>OpFlix</Text>
                            </View>
                            <TouchableOpacity style={styles.iconeFechar} onPress={props.navigation.toggleDrawer}>
                                <Text style={styles.x}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <DrawerItems {...props} />
                    </View>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem("@opflix:token");
                            props.navigation.navigate("Login")
                        }}
                        style={styles.botaoSair}
                    >
                        <Image
                            source={require("../assets/img/sair-icon.png")}
                            style={styles.sairIcon}
                        />
                        <Text style={styles.textoBranco}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    navContainer: {
        backgroundColor: "#a60400",
        // backgroundColor: "#A60313",
        flexDirection: "row",
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "space-between",
        height: 100,
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
        width: 200,
        alignSelf: "center"
    },
    textoLogo: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold",

    },
    iconeFechar: {
        tintColor: "#FFF",
    },
    sairIcon: {
        width: 30,
        height: 30,
        tintColor: "#FFF",
        marginRight: 20,
    },
    botaoSair: {
        flexDirection: "row",
        tintColor: "#FFF",
        paddingHorizontal: 15,
        alignItems: "center",
        backgroundColor: "#630811",
        paddingVertical: 15,
        // justifyContent : "space-around"
    },
    textoBranco: {
        color: "#FFF",
        fontSize: 17
    },
    x: {
        color: "#FFF",
        fontSize: 20,
    },
    flexMenu: {
        justifyContent: "space-between",
        height: Dimensions.get('window').height - 22,
    }

});

export default customDrawer;