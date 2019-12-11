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
    Dimensions
} from "react-native";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            lancamentos: [],
            favoritos: [],
            update: false,
            contagem: 0,
            novoValor: ''
        }
    }

    componentDidMount() {
        this._carregarLancamentos();
        this._carregarFavoritos();
        // this.setState({update : false})
    }

    _carregarLancamentos = async () => {
        await fetch("http://192.168.4.16:5000/api/lancamentos")
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(error => alert(error))

    }

    _recarregar = async (itens) => {
        alert(itens)

    }

    // shouldComponentUpdate(prevState) {
    //     if (prevState.favoritos != this.state.favoritos) {
    //         return true;
    //     }        
    //     return false;

    //     // if(this.state.update == true)
    //     //     return true;
    //     // return false;

    //     // if (this.state.contagem < 2 && this.state.contagem > 0){
    //     //     return true;
    //     // }
    //     // return false;
    // }



    // componentDidUpdate(prevProps, prevState) {
    //     console.warn(prevState.favoritos)

    //     // if(prevState.favoritos != this.state.favoritos){
    //     // this._carregarFavoritos();
    //     // }

    // }

    _carregarFavoritos = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (token !== null) {
                fetch("http://192.168.4.16:5000/api/favoritos/", {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ favoritos: data });
                    })
                    .catch(error => alert(error))


            }
        } catch (error) {
            alert("caiu no trycatch - " + error)
        }
    }

    _foiFavoritado(idLancamento) {
        let bool = false;
        this.state.favoritos.map(element => {
            if (element.idLancamento == idLancamento) {
                bool = true;
                return bool;
            }
        })
        return bool;
    }

    _formatarData = (element) => {
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano);
    }

    _favoritar = async (id) => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (token != null) {
                if (this._foiFavoritado(id) === false) {

                    await fetch("http://192.168.4.16:5000/api/favoritos", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            idLancamento: id
                        })
                    })
                        .then(resposta => {
                            return resposta
                        })
                        .then(data => { 
                            this._carregarFavoritos();
                            this._carregarLancamentos();

                            this._adicionarAoEstadoFavoritos(id)
                           
                            // this.props.navigation.navigate("Favoritos")
                        })
                        .catch(error => alert(error))
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    _adicionarAoEstadoFavoritos = (id) => {
        var lancamento = this._buscarLancamentoPorId(id);

        this.setState((prevState, props) => ({
            favoritos: this.state.favoritos.concat(lancamento)
        }));
    }


    _desfavoritar = async (id) => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (token != null) {
                if (this._foiFavoritado(id)) {

                    fetch("http://192.168.4.16:5000/api/favoritos/" + id, {
                        method: "DELETE",
                        headers: {
                            "Authorization": "Bearer " + token,
                        }
                    })
                        .then(() => {
                            this._carregarFavoritos();
                            this._carregarLancamentos();
                            this._removerDoEstadoFavoritos(id);

                        })
                        // .then(this.forceUpdate())
                        .catch(error => alert(error))
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    _removerDoEstadoFavoritos = (id) => {
        let lista = this.state.favoritos;
        lista = lista.filter(element => {
            return element.idLancamento !== id;
        })
        this.setState({ favoritos: lista })
    }


    _buscarLancamentoPorId = (idLancamento) => {
        let lancamento = this.state.lancamentos.find(element => {
            return element.idLancamento == idLancamento;
        });
        return lancamento;
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
                    <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                        <Image source={require("../assets/img/menu-icon.png")} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
                {/* FIM DO NAV */}

                <Text style={styles.tituloPrincipal}>Lançamentos</Text>
                <View >

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
                                        {this._foiFavoritado(item.idLancamento) === true ?
                                            <TouchableOpacity style={styles.botaoDesfavoritar} onPress={() => this._desfavoritar(item.idLancamento)}>
                                                <Image
                                                    style={styles.iconeDesfavoritar}
                                                    source={require("../assets/img/estrela.png")}
                                                />
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                style={styles.botaoFavoritar}
                                                onPress={() => { this._favoritar(item.idLancamento) }}
                                            >
                                                <Image
                                                    style={styles.iconeFavoritar}
                                                    source={require("../assets/img/estrela.png")}
                                                // onPress={() => this._mudarDeCor}
                                                />
                                            </TouchableOpacity>
                                        }
                                        <TouchableOpacity
                                            onPress={() => this.props.navigation.navigate("lancamentoScreen", {
                                                idLancamento: item.idLancamento,
                                                nomeCategoria: item.idCategoriaNavigation.nome,
                                                nomePlataforma: item.idPlataformaNavigation.nome,
                                                tipo: item.idTipoLancamentoNavigation.nome,
                                            })}>
                                            <Image style={styles.iconeSeta} source={require("../assets/img/arrow.png")} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
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
    lista: {
        height: Dimensions.get("window").height - 180,
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
    botaoFavoritar: {
        // backgroundColor : "#717171",
        backgroundColor: "#a60313",
        borderWidth: 0.1,
        borderRadius: 50,
        padding: 5,
        marginRight: 10,

    },
    iconeFavoritar: {
        height: 25,
        width: 25,
        tintColor: "#FFF",
    },
    botaoDesfavoritar: {
        backgroundColor: "#a60313",
        borderWidth: 0.1,
        borderRadius: 50,
        padding: 5,
        marginRight: 10,
    },
    iconeDesfavoritar: {
        height: 25,
        width: 25,
    },
    iconeSeta: {
        height: 30,
        width: 30,
        transform: [{ rotate: '270deg' }],
        tintColor: "#999999",

    },
    tituloLancamento: {
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center",
        marginBottom: 5,
    },
    flexBoxLancamento: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "nowrap",
    },
    botoes: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
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
    }
})
export default Main;