import React, { Component } from "react";
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
    Modal
} from "react-native";

class AdmLancamentos extends Component {
    constructor() {
        super();
        this.state = {
            lancamentos: null,

            exibindoModal : false,
            confirmaExcluir : false,
        }
    }

    componentDidMount() {
        this._carregarLancamentos();
    }

    _carregarLancamentos = async () => {
        await fetch("http://192.168.4.16:5000/api/lancamentos")
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(error => alert(error))

    }

    _formatarData = (element) => {
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano);
    }

    _excluir = async(id, titulo) => {

        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            fetch("http://192.168.4.16:5000/api/lancamentos/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            .then(response => {
                if (response.status === 200){
                    (alert("\"" + titulo + "\" foi excluído com sucesso"))
                }
            })
            .then(this._carregarLancamentos)
            .catch(error => console.warn(error));
        } catch (error) {
            alert(error)
        }
    }

    _redirecionarParaEditar = (id) =>{
        this.props.navigation.navigate("editarScreen",{
            idLancamento : id,
        })
    }

    _confirmarExclusao = () =>{
        this.setState({exibindoModal : true});

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

                <Text style={styles.tituloPrincipal}>Lançamentos</Text>

                {/* <Modal
                    visible={this.state.exibindoModal}
                    animationType="fade"
                    onRequestClose={() => this.setState({ exibindoModal: false })}
                    style={styles.confirmBox}
                >
                    <Text>a</Text>
                </Modal>  */}

                
                <FlatList
                    style={styles.lista}
                    data={this.state.lancamentos}
                    keyExtractor={item => item.idLancamento.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.boxLancamento}>
                            <Text style={styles.tituloLancamento}>{item.titulo}</Text>
                            <View>
                                <View style={styles.flexTexto}>
                                    <Text style={styles.textoBold}>Plataforma: </Text>
                                    <Text style={styles.caracteristica}>{item.idPlataformaNavigation.nome}</Text>
                                </View>
                                <View style={styles.flexTexto}>
                                    <Text style={styles.textoBold}>Gênero: </Text>
                                    <Text style={styles.caracteristica}>{item.idCategoriaNavigation.nome}</Text>
                                </View>
                                <View style={styles.flexTexto}>
                                    <Text style={styles.textoBold}>Tipo: </Text>
                                    <Text style={styles.caracteristica}>{item.idTipoLancamentoNavigation.nome}</Text>
                                </View>

                            </View>
                            <View style={styles.flexBoxLancamento}>
                                <Text style={styles.data}>{this._formatarData(item)}</Text>
                                <View style={styles.botoes}>
                                    <TouchableOpacity
                                        onPress={() => this._redirecionarParaEditar(item.idLancamento)}
                                    >
                                        {/* editar */}
                                        <Image source={require("../../assets/img/editar-icon.png")} style={styles.icone} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this._excluir(item.idLancamento, item.titulo)}
                                        // onPress={() => this.setState({exibindoModal : true})}
                                    >
                                        {/* EXCLUIR */}
                                        <Image source={require("../../assets/img/excluir-icon.png")} style={styles.icone} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
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
    lista: {
        height: Dimensions.get("window").height - 180,
    },
    icone: {
        height: 30,
        width: 30,
        tintColor: "#000",
        // paddingVertical 
    },
    boxLancamento: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#707070",
        width: "90%",
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
        // marginRight : 100,
    },

    tituloLancamento: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        marginBottom: 5,
    },
    flexBoxLancamento: {
        // flexDirection: "column",
        // justifyContent: "space-between",
        // flexWrap: "nowrap",
    },
    botoes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        // width: "100%",
        // backgroundColor : "#a60313",
        paddingTop: 15,
        borderTopWidth: 1,
        marginTop: 10,
        borderTopColor: "#D2D1D1",
    },
    data: {
        color: "#11A7F2",
        fontSize: 22,
        fontWeight: "bold",
    },
    flexTexto: {
        flexDirection: "row",
    },
    textoBold: {
        fontWeight: "bold",
        fontSize: 18,
    },
    caracteristica: {
        fontSize: 18,
    },
    boxIcon : {
        textAlign : "right",
        flexDirection : "row",
        justifyContent  : "flex-end",
        alignItems : "center",
        backgroundColor : "#a60313",
        borderRadius : 15,
        width : "90%",
    },
    iconCadastrar : {
        height : 35,
        width : 35,
        marginHorizontal : "5%"
    },
    confirmBox : {
        width : 200,
        height : 180,
    }
    
})

export default AdmLancamentos;