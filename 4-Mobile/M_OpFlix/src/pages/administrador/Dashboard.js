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
    Dimensions
} from "react-native";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            nomeDoAdm: "Administrador",
        }
    }

    componentDidMount() {
        this._pegarNomeDoAdmLogado();
    }

    _pegarNomeDoAdmLogado = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");
            let usuario = JwtDecode(token);
            let nome = usuario.nome.split(" ")[0]
            this.setState({ nomeDoAdm: nome })
        } catch (error) {
        }
    }


    render() {
        return (
            <SafeAreaView>
                {/* <Nav/> */}
                <StatusBar
                    animated={true}
                    backgroundColor="#A60313"
                    barStyle="light-content"
                />

                <View style={styles.navContainer}>
                    <View style={styles.logo}>
                        <Image source={require("../../assets/img/icon-logo.png")} style={{ width: 50, height: 50 }} />
                        <Text style={styles.textoLogo}>OpFlix</Text>
                    </View>
                    <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                        <Image source={require("../../assets/img/menu-icon.png")} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>

                {/* FIM DO NAV */}

                <Text style={styles.tituloPrincipal}>{"Bem vindo, " + this.state.nomeDoAdm}</Text>
                <View style={styles.boxes}>
                    <View style={styles.linhaBoxes}>
                        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("AdmLancamentos")}>
                            <Image
                                source={require("../../assets/img/lancamentos-icon.png")}
                                style={styles.icone}
                            />
                            <Text style={styles.boxTexto}>Lançamentos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("Categorias")}>
                            <Image
                                source={require("../../assets/img/categorias-icon.png")}
                                style={styles.icone}
                            />
                            <Text style={styles.boxTexto}>Categorias</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("Plataformas")}>
                            <Image
                                source={require("../../assets/img/plataformas-icon.png")}
                                style={styles.icone}
                            />
                            <Text style={styles.boxTexto}>Plataformas</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linhaBoxes}>
                        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("CadastroLancamento")}>
                            <Image
                                source={require("../../assets/img/adicionarLancamento-icon.png")}
                                style={styles.icone}
                            />
                            <Text style={styles.boxTexto}>Cadastrar lançamento</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.box} onPress={() => this.props.navigation.navigate("CadastroUsuarioAdm")}>
                            <Image
                                source={require("../../assets/img/addUser-icon.png")}
                                style={styles.icone}
                            />
                            <Text style={styles.boxTexto}>Cadastrar usuário/administrador</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
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
        fontWeight: "bold"
    },
    menuIcon: {
        width: 50,
        height: 35,
        zIndex: 1000,
    },

    tituloPrincipal: {
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 22,
        paddingVertical: 14,
        width: "90%",

        borderBottomWidth: 3,
        borderColor: "#A60313",
        marginBottom: 5,
    },
    iconeSeta: {
        height: 30,
        width: 30,
        transform: [{ rotate: '270deg' }],
        tintColor: "#999999",
    },
    boxes :{
        justifyContent : "space-around",
        height : "60%",
        alignItems : "center",
        marginLeft : "7.5%",
        marginTop : "10%",
        flexDirection: "column",
        flexWrap : "wrap",
        width : "90%",
    },
    boxTexto:{
        fontSize : 15,
        textAlign : "center"
    },
    linhaBoxes : {
        flexDirection : "row",
        justifyContent : "space-evenly",

    },
    box :{
        maxWidth : "30%",
        // flexDirection : "row",
        alignItems : "center",
        marginHorizontal : 15,
    },
    icone : { 
        width: 70, 
        height: 70, 
    },
})

export default Dashboard