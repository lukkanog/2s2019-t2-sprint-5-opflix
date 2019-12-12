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
    TextInput,
    Picker,
} from "react-native";

class Filtrar extends Component {
    constructor() {
        super();
        this.state = {
            lancamentos: [],
            categorias: [],
            plataformas: [],
            favoritos: [],

            titulo: "",
            idCategoria: 0,
            idPlataforma: 0,

            naoFoiEncontrado: false,
        }
    }

    componentDidMount() {
        this._carregarPlataformas();
        this._carregarCategorias();
        this._carregarFavoritos();
    }

    _carregarCategorias = async () => {
        try {

            let token = await AsyncStorage.getItem("@opflix:token")

            await fetch("http://192.168.4.16:5000/api/categorias", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ categorias: data }))
                .catch(error => alert(error))
        } catch (error) {
            alert(error);
        }
    }

    _carregarPlataformas = async () => {
        try {

            let token = await AsyncStorage.getItem("@opflix:token")

            await fetch("http://192.168.4.16:5000/api/plataformas", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ plataformas: data }))
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }


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
                            // this._carregarLancamentos();

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

        this.setState(() => ({
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
                            // this._carregarLancamentos();
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

    _procurarLancamento = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            console.log("aa")
            if (token != null) {
                if (this.state.titulo != null && this.state.titulo != "") {

                    fetch("http://192.168.4.16:5000/api/lancamentos/buscar/" + this.state.titulo, {
                        headers: {
                            "Authorization": "Bearer " + token,
                        },
                    })
                        .then(resposta => resposta.json())
                        .then(data => {
                            this.setState({ lancamentos: data });
                            console.log(data)
                            this.setState(function (prevState) {
                                if (data.length <= 0) {
                                    this.setState({ naoFoiEncontrado: true });
                                } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                                    this.setState({ naoFoiEncontrado: false })
                                }
                            });
                        })
                        .then(this.setState({ titulo: "" }))
                        .catch(error => console.log(error))
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    _filtrarPorCategoria = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (this.state.idCategoria !== "" && this.state.idCategoria !== 0) {

                await fetch("http://192.168.4.16:5000/api/lancamentos/filtrar/categoria/" + this.state.idCategoria, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ lancamentos: data });
                        this.setState(function (prevState) {
                            if (data.length <= 0) {
                                this.setState({ naoFoiEncontrado: true });
                            } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                                this.setState({ naoFoiEncontrado: false })
                            }
                        })
                    })
                    .catch(error => console.log(error))
            }
        } catch (error) {
            alert(error)
        }
    }

    _filtrarPorPlataforma = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (this.state.idPlataforma !== "" && this.state.idPlataforma !== 0) {

                await fetch("http://192.168.4.16:5000/api/lancamentos/filtrar/plataforma/" + this.state.idPlataforma, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ lancamentos: data });
                        this.setState(function (prevState) {
                            if (data.length <= 0) {
                                this.setState({ naoFoiEncontrado: true });
                            } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                                this.setState({ naoFoiEncontrado: false })
                            }
                        })
                    })
                    .catch(error => console.log(error))
            }
        } catch (error) {
            alert(error)
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
                    <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                        <Image source={require("../assets/img/menu-icon.png")} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
                {/* FIM DO NAV */}

                <View style={{ alignItems: "center", }}>


                    <Text style={styles.tituloPrincipal}>Filtrar</Text>
                    <View style={{ borderBottomWidth: 3,borderColor: "#A60313", marginBottom: 5,}}>

                    <View style={styles.flexInput}>
                        {/* <Text>Procurar por nome</Text> */}
                        <TextInput
                            style={styles.textInput}
                            placeholder={"Procurar por título"}
                            // placeholderTextColor={"#fafafa"}

                            onChangeText={titulo => this.setState({ titulo })}
                        />
                        <TouchableOpacity onPress={this._procurarLancamento} style={styles.botaoBuscar}>
                            <Text style={styles.textoBranco}>Buscar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flexInput}>
                        {/* <Text>Filtrar por Categoria </Text> */}
                        <Picker style={styles.select} onValueChange={idCategoria => this.setState({ idCategoria })} selectedValue={this.state.idCategoria}>
                            <Picker.Item label="Filtrar por Categoria" value={0} />
                            {this.state.categorias.map(item => {
                                return (
                                    <Picker.Item key={item.idCategoria} value={item.idCategoria} label={item.nome} />
                                )
                            })}
                        </Picker>
                        <TouchableOpacity onPress={this._filtrarPorCategoria} style={styles.botaoBuscar}>
                            <Text style={styles.textoBranco}>Filtrar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.flexInput}>
                        {/* <Text>Filtrar por Plataforma </Text> */}
                        <Picker onValueChange={idPlataforma => this.setState({ idPlataforma })} selectedValue={this.state.idPlataforma} style={styles.select}>
                            <Picker.Item label="Filtrar por Plataforma" value={0} />
                            {this.state.plataformas.map(item => {
                                return (
                                    <Picker.Item key={item.idPlataforma} value={item.idPlataforma} label={item.nome} />
                                )
                            })}
                        </Picker>
                        <TouchableOpacity onPress={this._filtrarPorPlataforma} style={styles.botaoBuscar}>
                            <Text style={styles.textoBranco}>Filtrar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>


                    {this.state.naoFoiEncontrado === false ? null : <Text>Resultado não encontrado.</Text>}

                    {this.state.lancamentos !== undefined && this.state.lancamentos.length >= 1 && this.state.naoFoiEncontrado === false ?
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
                            )} />
                        :
                        <Text style={{ marginTop: 50 }}>Os resultados aparecerão aqui :)</Text>
                    }
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

        // borderBottomWidth: 3,
        // borderColor: "#A60313",
        // marginBottom: 5,
    },
    lista: {
        height: Dimensions.get("window").height - 320,
        maxWidth : Dimensions.get("window").width - 5,
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
    },
    flexInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
    },
    textInput: {
        borderColor: "#000",
        borderWidth: 1,
        width: "75%",
        height: 29,
        color: "#000",
        paddingVertical: 0,
        // fontSize : 14,
    },
    select: {
        width: "75%",
        borderColor: 1,
        borderColor: "#000"
    },
    botaoBuscar: {
        backgroundColor: "#a60313",
        width: 70,
        height: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    textoBranco: {
        color: "#fff",
    }
})

export default Filtrar;