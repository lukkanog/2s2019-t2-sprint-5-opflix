import React, { Component } from "react";
import {
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Dimensions,
} from "react-native";

class Lancamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lancamento: {},
            nomeCategoria: this.props.navigation.getParam("nomeCategoria"),
            nomePlataforma: this.props.navigation.getParam("nomePlataforma"),
            tipo: this.props.navigation.getParam("tipo"),
        }
    }

    componentDidMount() {
        let id = this.props.navigation.getParam("idLancamento");
        this._carregarInformacoes(id);
    }

    _carregarInformacoes = async (idLancamento) => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");
            if (token !== null) {
                fetch("http://192.168.4.16:5000/api/lancamentos/" + idLancamento, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ lancamento: data });
                    })
                    .catch(error => alert(error))
            }
        } catch (error) {
            console.warn(error)
        }
    }

    _formatarData(dataRecebida) {

        if (dataRecebida !== undefined && dataRecebida !== null) {
            let data = dataRecebida.split("T")[0];
            let ano = data.split("-")[0];
            let mes = data.split("-")[1];
            let dia = data.split("-")[2];
            return (dia + "/" + mes + "/" + ano);
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
                        <Image source={require("../assets/img/icon-logo.png")} style={{ width: 50, height: 50 }} />
                        <Text style={styles.textoLogo}>OpFlix</Text>
                    </View>
                </View>
                {/* FIM DO NAV */}

                <View style={styles.flexRow}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                        <Image style={styles.seta} source={require("../assets/img/arrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.tituloPrincipal}>{this.state.lancamento.titulo}</Text>
                </View>


                <View >
                    <ScrollView contentContainerStyle={{ height: 1500, alignItems: "center" }}>

                        <View style={styles.shadow}>
                            <Image source={require("../assets/img/jureg-teste.png")} style={styles.imagemCapa} />
                        </View>

                        <View style={styles.flexTextos}>
                            <Text style={styles.textoBold}>Plataforma: </Text>
                            <Text style={styles.textoCaracteristicas}>{this.state.nomePlataforma}</Text>
                        </View>
                        <View style={styles.flexTextos}>
                            <Text style={styles.textoBold}>Categoria: </Text>
                            <Text style={styles.textoCaracteristicas}>{this.state.nomeCategoria}</Text>
                        </View>
                        <View style={styles.flexTextos}>
                            <Text style={styles.textoBold}>Tipo: </Text>
                            <Text style={styles.textoCaracteristicas}>{this.state.tipo}</Text>
                        </View>

                        <View style={styles.flexTextos}>
                            <Text style={styles.textoBold}>Duração: </Text>
                            {this.state.tipo == "Serie" ?
                                <Text style={styles.textoCaracteristicas}>{this.state.lancamento.duracao + " minutos por episódio"}</Text>
                                :
                                <Text style={styles.textoCaracteristicas}>{this.state.lancamento.duracao + " minutos"}</Text>
                            }
                        </View>

                        <View style={styles.flexTextos}>
                            <Text style={styles.textoBold}>Sinopse: </Text>
                            <Text style={styles.sinopse}>{this.state.lancamento.sinopse}</Text>
                        </View>

                        <Text style={styles.data}>{this._formatarData(this.state.lancamento.dataLancamento)}</Text>


                    </ScrollView>
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
        fontWeight: "bold",
        fontSize: 22,
        paddingVertical: 14,
        width: "90%",

    },
    seta: {
        height: 30,
        width: 30,
        transform: [{ rotate: "90deg" }],
        tintColor: "#999999",
    },
    scroll: {
        height: "100%",
    },
    data: {
        color: "#11A7F2",
        fontSize: 25,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: "5%"
    },
    flexRow: {
        paddingVertical: 10,
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 3,
        borderColor: "#A60313",
        marginBottom: 5,
    },
    textoBold: {
        fontWeight: "bold",
        fontSize: 20,
    },
    textoCaracteristicas: {
        fontSize: 20,
        color: "#00000098",
        textAlign: "justify",
    },
    sinopse: {
        fontSize: 20,
        color: "#00000098",
        textAlign: "justify",
    },
    imagemCapa: {
        width: 120,
        height: 160,
        marginTop: 10,
        marginBottom: 15,
    },
    shadow : {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        
        elevation: 24,
    },
    flexTextos: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        flexWrap: "wrap",
        paddingVertical: 2.5,
    },
    container: {
        alignItems: "center",
    }
})
export default Lancamento