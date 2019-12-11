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
import DatePicker from "react-native-datepicker";

class CadastroLancamento extends Component {
    constructor() {
        super();
        this.state = {
            categorias: [],
            plataformas: [],
            tipos: [],

            idCategoria: null,
            idTipoLancamento: null,
            idPlataforma: null,
            titulo: null,
            duracao: null,
            sinopse: null,
            dataLancamento: null,
        }
    }

    componentDidMount() {
        this._carregarCategorias();
        this._carregarTipos();
        this._carregarPlataformas();
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
            alert(error);
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


    _cadastrarLancamento = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (this.state.idCategoria === null || this.state.idPlataforma == null || this.state.idTipoLancamento == null || this.state.idTipoLancamento == null || this.state.titulo == null || this.state.sinopse == null || this.state.duracao == null || this.state.dataLancamento == null) {
                alert("Por favor, preencha todos os campos necessários.")
            } else {

                await fetch("http://192.168.4.16:5000/api/lancamentos", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-Type": "application/json",
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
                            alert("\"" + this.state.titulo + "\" foi cadastrado com sucesso.");
                            this.props.navigation.navigate("AdmLancamentos");
                        } else {
                            console.warn(response.status)
                        }
                    })
                    .catch(error => console.warn(error))


                console.warn(JSON.stringify({
                    idCategoria: this.state.idCategoria,
                    idPlataforma: this.state.idPlataforma,
                    idTipoLancamento: this.state.idTipoLancamento,
                    titulo: this.state.titulo,
                    sinopse: this.state.sinopse,
                    duracao: this.state.duracao,
                    dataLancamento: this._dataParaFormatoJson(this.state.dataLancamento),
                }))
            }


        } catch (error) {

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
                    <TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
                        <Image source={require("../../assets/img/menu-icon.png")} style={styles.menuIcon} />
                    </TouchableOpacity>
                </View>
                {/* FIM DO NAV */}

                <Text style={styles.tituloPrincipal}>Cadastrar novo lançamento</Text>

                {/* form */}
                <View style={styles.form}>

                    <View>
                        <Text>Título</Text>
                        <TextInput
                            style={styles.input}
                            maxLength={100}
                            onChangeText={titulo => this.setState({ titulo })}
                        />
                    </View>

                    <View>
                        <Text>Duração (em minutos)</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={duracao => this.setState({ duracao })}
                            maxLength={8}
                        />
                    </View>

                    <View>
                        <Text>Sinopse</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={sinopse => this.setState({ sinopse })}
                        />
                    </View>

                    <View>
                        <Text>Tipo do lançamento</Text>
                        <Picker
                            style={styles.input}
                            onValueChange={idTipoLancamento => this.setState({ idTipoLancamento })}
                            selectedValue={this.state.idTipoLancamento == null ? null : this.state.idTipoLancamento}
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
                            onValueChange={idPlataforma => this.setState({ idPlataforma })}
                            mode="dialog"
                            selectedValue={this.state.idPlataforma == null ? null : this.state.idPlataforma}

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
                            prompt="Selecione uma categoria"
                            onValueChange={idCategoria => this.setState({ idCategoria })}
                            selectedValue={this.state.idCategoria == null ? null : this.state.idCategoria}
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
                        <Text>Data de lançamento</Text>

                        <DatePicker
                            onDateChange={(dataLancamento) => { this.setState({ dataLancamento }) }}
                            date={this.state.dataLancamento !== null ? this._formatarData(this.state.dataLancamento) : null}
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

                </View>
                <TouchableOpacity style={styles.submit} onPress={this._cadastrarLancamento}>
                    <Text style={styles.submitText}>Cadastra Lançamento</Text>
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

export default CadastroLancamento;