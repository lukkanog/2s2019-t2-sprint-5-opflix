import React, { Component } from "react";
import JwtDecode from "jwt-decode";
import {
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    ImageBackground,
} from "react-native";

class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            erro: null,
        }
    }



    componentDidMount() {
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(() => {
            this._redirecionar()
        }, 2500);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    _redirecionar = async () => {
        try {
            var token = await AsyncStorage.getItem("@opflix:token");
            if (token == undefined) {
                this.props.navigation.navigate("Login");
            }

            var user = JwtDecode(token)

            var dataAtual = Date.now().valueOf() / 1000;
            if (user.exp < dataAtual) {
                this.props.navigation.navigate("Login");
            }
            
            switch (user.permissao) {
                case 'ADMINISTRADOR':
                    this.props.navigation.navigate("AdmDrawerNavigator");
                    break;
                case 'CLIENTE':
                    this.props.navigation.navigate("DrawerNavigator");
                    break;
                default:
                    this.props.navigation.navigate("Login");
                    break;
            }
        } catch (error) {
            this.props.navigation.navigate("Login");
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden={true}/>
                <View style={styles.logo}>
                    <Image source={require("../assets/img/icon-logo.png")} style={{ width: 100, height: 100 }} />
                    <Text style={styles.textoLogo}>OpFlix</Text>
                </View>
            </SafeAreaView>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "#a60313",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
        width: 200,
        alignSelf: "center",
        marginRight : 100,
    },
    textoLogo: {
        color: "#fff",
        fontSize: 60,
        fontWeight: "bold",

    },
    textoBranco: {
        color: "#FFF",
        fontSize: 17
    },

});



export default SplashScreen;