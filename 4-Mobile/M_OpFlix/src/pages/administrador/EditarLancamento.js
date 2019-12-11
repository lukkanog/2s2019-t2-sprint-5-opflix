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
    TextInput,
    Picker
} from "react-native";
// import Picker from "react-native-picker-select";
import DatePicker from "react-native-datepicker";


class EditarLancamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lancamento: {},

            categorias: [],
            plataformas: [],
            tipos: [],

            idCategoria: "",
            idTipoLancamento: "",
            idPlataforma: "",
            titulo: "",
            duracao: "",
            sinopse: "",
            dataLancamento: "",
        }
    }



    componentDidMount() {
        this._carregarPlataformas();
        this._carregarCategorias();
        this._carregarTipos();

        let id = this.props.navigation.getParam("idLancamento");
        this._carregarInformacoes(id);
    }


    _carregarPlataformas = async () => {
        try {

            let token = await AsyncStorage.getItem("@opflix:token")

            fetch("http://192.168.4.16:5000/api/plataformas", {
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

    _carregarCategorias = async () => {
        try {

            let token = await AsyncStorage.getItem("@opflix:token")

            fetch("http://192.168.4.16:5000/api/categorias", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ categorias: data }))
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
    }

    _carregarTipos = async () => {
        try {

            let token = await AsyncStorage.getItem("@opflix:token")

            fetch("http://192.168.4.16:5000/api/tiposlancamento", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ tipos: data }))
                .catch(error => alert(error))
        } catch (error) {
            alert(error)
        }
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
                    .then(data => this.setState({
                        lancamento: data,
                        sinopse: data.sinopse,
                        dataLancamento: data.dataLancamento,
                        duracao: data.duracao,
                        idCategoria: data.idCategoria,
                        idPlataforma: data.idPlataforma,
                        idTipoLancamento: data.idTipoLancamento,
                        titulo: data.titulo,
                    }))

                    .catch(error => alert(error))

            }
        } catch (error) {
            alert(error)
        }
    }


    _editarLancamento = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");
            let id = this.props.navigation.getParam("idLancamento");

            fetch("http://192.168.4.16:5000/api/lancamentos/" + id, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    'Content-Type': "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    idCategoria: this.state.idCategoria,
                    idPlataforma: this.state.idPlataforma,
                    idTipoLancamento: this.state.idTipoLancamento,
                    titulo: this.state.titulo,
                    sinopse: this.state.sinopse,
                    dataLancamento: this._dataParaFormatoJson(this.state.dataLancamento),
                    duracao: this.state.duracao,
                })
            })
                .then(response => {
                    if (response.status == 200) {
                        alert("Alterações salvas com sucesso.")
                    }
                })
                .then(this.props.navigation.navigate("AdmLancamentos"))
                .catch(error => alert(error))


        } catch (error) {
            alert(error)
        }
    }


    _dataParaFormatoJson = (data) => {
        let dia = data.split("-")[0]
        let mes = data.split("-")[1]
        let ano = data.split("-")[2]

        return (mes + "-" + dia + "-" + ano)
    }

    _formatarData(dataRecebida) {
        if (dataRecebida !== undefined && dataRecebida !== null) {
            let data = dataRecebida.split("T")[0];
            let ano = data.split("-")[0];
            let mes = data.split("-")[1];
            let dia = data.split("-")[2];
            return (dia + "-" + mes + "-" + ano);
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
                </View>
                {/* FIM DO NAV */}

                <View style={styles.flexRow}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("AdmLancamentos")}>
                        <Image style={styles.seta} source={require("../../assets/img/arrow.png")} />
                    </TouchableOpacity>
                    <Text style={styles.tituloPrincipal}>Editar - {this.state.lancamento.titulo}</Text>
                </View>

                {/* form */}
                <View style={styles.form}>

                    <View>
                        <Text>Título</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={this.state.lancamento.titulo}
                            maxLength={100}
                            onChangeText={titulo => this.setState({ titulo })}
                        />
                    </View>

                    <View>
                        <Text>Tipo do lançamento</Text>
                        <Picker
                            style={styles.input}
                            defaultValue={this.state.lancamento.idTipoLancamento}
                            onValueChange={idTipoLancamento => this.setState({ idTipoLancamento })}
                        >
                            {this.state.tipos.map(element => {
                                return (
                                    <Picker.Item
                                        key={element.idTipoLancamento}
                                        value={element.idTipoLancamento}
                                        label={element.nome}
                                    />
                                )
                            })}
                        </Picker>
                    </View>

                    <View>
                        <Text>Plataforma</Text>
                        <Picker
                            style={styles.input}
                            defaultValue={this.state.lancamento.idPlataforma}
                            onValueChange={idPlataforma => this.setState({ idPlataforma })}
                        >
                            {this.state.plataformas.map(element => {
                                return (
                                    <Picker.Item
                                        key={element.idPlataforma}
                                        value={element.idPlataforma}
                                        label={element.nome}
                                    />
                                )
                            })}
                        </Picker>
                    </View>

                    <View>
                        <Text>Categoria</Text>
                        <Picker
                            style={styles.input}
                            defaultValue={this.state.lancamento.idCategoria}
                            onValueChange={idCategoria => this.setState({ idCategoria })}
                        >
                            {this.state.categorias.map(element => {
                                return (
                                    <Picker.Item
                                        key={element.idCategoria}
                                        value={element.idCategoria}
                                        label={element.nome}
                                    />
                                )
                            })}
                        </Picker>
                    </View>

                    <View>
                        <Text>Duração (em minutos)</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={JSON.stringify(this.state.lancamento.duracao)}
                            keyboardType="numeric"
                            onChangeText={duracao => this.setState({ duracao })}
                            maxLength={8}
                        />
                    </View>

                    <View>
                        <Text>Data de lançamento</Text>

                        <DatePicker
                            onDateChange={(dataLancamento) => { this.setState({ dataLancamento }) }}
                            date={this.state.dataLancamento !== "" ? this._formatarData(this.state.dataLancamento) : null}
                            mode="date"
                            placeholder="Data de lançamento:"
                            format="DD-MM-YYYY"
                            minDate="01-01-1900"
                            maxDate={"01-01-2199"}
                            confirmBtnText="Confirmar"
                            cancelBtnText="Cancelar"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,

                                },

                            }}
                        />
                    </View>

                    <View>
                        <Text>Sinopse</Text>
                        <TextInput
                            style={styles.input}
                            defaultValue={this.state.lancamento.sinopse}
                            onChangeText={sinopse => this.setState({ sinopse })}
                        />
                    </View>

                </View>
                <TouchableOpacity style={styles.submit} onPress={this._editarLancamento}>
                    <Text style={styles.submitText}>Salvar alterações</Text>
                </TouchableOpacity>
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
    seta: {
        height: 30,
        width: 30,
        transform: [{ rotate: "90deg" }],
        tintColor: "#999999",
    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
    }, flexRow: {
        paddingVertical: 10,
        alignSelf: "center",
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 3,
        borderColor: "#A60313",
        marginBottom: 5,
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
    lista: {
        height: Dimensions.get("window").height - 180,
    },
    icone: {
        height: 30,
        width: 30,
        tintColor: "#000",
        // paddingVertical 
    },
    form: {
        width: "85%",
        marginLeft: "7.5%",
        justifyContent: "space-around",
        minHeight: 450,
    },
    input: {
        borderColor: "#000",
        borderWidth: 1,
        height: 30,
    },
    submit: {
        width: "85%",
        backgroundColor: "#a60313",
        marginLeft: "7.5%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    submitText: {
        color: "#F2EB12",
        fontWeight: "700",
        fontSize: 20,
    }

})

export default EditarLancamento;