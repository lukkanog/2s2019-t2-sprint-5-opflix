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

class CadastroUsuario extends Component {
    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            confirmaSenha: null,
            dataNascimento: null,
            idTipoUsuario: null,

            tipos: null,
        }
    }

    componentDidMount() {
        this._carregarTiposDeUsuarios();
    }

    _carregarTiposDeUsuarios = async () => {
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            fetch("http://192.168.4.16:5000/api/tiposusuario", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ tipos: data }))
                .catch(error => console.warn(error))

        } catch (error) {
            alert(error)
        }
    }

    _fazerCadastro = async () => {
        console.warn(JSON.stringify({
            idTipoUsuario: this.state.idTipoUsuario,
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            dataNascimento: this._dataParaFormatoJson(this.state.dataNascimento),
        }))
        
        try {
            if (this.state.idTipoUsuario == null || this.state.senha == null || this.state.email == null || this.state.nome == null || this.state.dataNascimento == null) {
                
                alert("Preencha todos os campos corretamente")
                
            } else {
                
                if (this.state.confirmaSenha == this.state.senha) {

                    let token = await AsyncStorage.getItem("@opflix:token");
                    fetch("http://192.168.4.16:5000/api/usuarios/cadastraradmin", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer " + token,
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({
                            nome: this.state.nome,
                            email: this.state.email,
                            senha: this.state.senha,
                            dataNascimento:this._dataParaFormatoJson(this.state.dataNascimento),
                            idTipoUsuario: Number(this.state.idTipoUsuario),
                        })
                    })
                        .then(response => {
                            if (response.status === 200){
                                alert("Usuário cadastrado com sucesso!")
                            }    
                        })
                        .catch(error => console.warn(error))


                } else {
                    alert("Confirme sua senha direito po :/")
                }

            }



        } catch (error) {
            alert("Erro: " + error)
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


                <Text style={styles.tituloPrincipal}>Cadastrar usuário</Text>


                {/* form */}
                <View style={styles.form}>
                    <View>
                        <Text>Permissão</Text>
                        <Picker 
                        style={styles.input}
                        onValueChange={idTipoUsuario => this.setState({ idTipoUsuario })}
                        selectedValue={this.state.idTipoUsuario == null ? null : this.state.idTipoUsuario}

                        >
                            {this.state.tipos == null ? null : this.state.tipos.map(item => {
                                return (
                                    <Picker.Item
                                        key={item.idTipoUsuario}
                                        value={item.idTipoUsuario}
                                        label={item.nome}
                                    />
                                )
                            })}
                        </Picker>
                    </View>

                    <View>
                        <Text>Nome Completo</Text>
                        <TextInput
                        style={styles.input}
                            maxLength={100}
                            onChangeText={nome => this.setState({ nome })}
                        />
                    </View>
                    <View>
                        <Text>Email</Text>
                        <TextInput
                        style={styles.input}
                            maxLength={100}
                            onChangeText={email => this.setState({ email })}
                        />
                    </View>

                    <DatePicker
                        onDateChange={(dataNascimento) => { this.setState({ dataNascimento }) }}
                        style={styles.inputData}
                        date={this.state.dataNascimento !== null ? this._formatarData(this.state.dataNascimento) : null}
                        mode="date"
                        placeholder="Data de nascimento"
                        placeholderTextColor="#FFF"
                        format="DD-MM-YYYY"
                        minDate="01-01-1901"
                        maxDate={"01-01-2020"}
                        confirmBtnText="Confirmar"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0,

                            },
                            dateInput: {
                                marginLeft: 36,
                            },

                            // ... You can check the source to find the other keys.
                        }}
                    />

                    <View>
                        <Text>Senha</Text>
                        <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                            maxLength={100}
                            onChangeText={senha => this.setState({ senha })}
                        />
                    </View>
                    <View>
                        <Text>Confirmar Senha</Text>
                        <TextInput
                        style={styles.input}
                            secureTextEntry={true}
                            maxLength={100}
                            onChangeText={confirmaSenha => this.setState({ confirmaSenha })}
                        />
                    </View>


                    <TouchableOpacity style={styles.submit} onPress={this._fazerCadastro}>
                        <Text style={styles.submitText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        )
    }
}

styles = StyleSheet.create({
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
    form :{
        width : "85%",
        marginLeft :"7.5%",
        justifyContent : "space-around",
        minHeight : 450,
    },
    input :{
        borderColor : "#000",
        borderWidth : 1,
        height : 30,
    },
    submit : {
        width : "85%",
        backgroundColor : "#a60313",
        marginLeft :"7.5%",
        textAlign : "center",
        justifyContent : "center",
        alignItems : "center"
    },
    submitText : {
        color : "#F2EB12",
        fontWeight : "700",
        fontSize : 20,
    }

})


export default CadastroUsuario;