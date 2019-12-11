import React, { Component } from "react";
import DatePicker from "react-native-datepicker";
import Picker from "react-native-picker-select";

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
    ImageBackground
} from "react-native";

class Cadastro extends Component {
    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            confirmaSenha: null,
            dataNascimento: null,
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




    _fazerCadastro = async () => {
        try {
            if (this.state.senha !== null && this.state.email !== null && this.state.nome !== null && this.state.dataNascimento !== null ){

                if ( this.state.confirmaSenha == this.state.senha){
                    
                    await fetch("http://192.168.4.16:5000/api/usuarios",{
                        method : "POST",
                        headers:{
                            "Content-type" : "application/json",
                            "Accept" : "application/json"
                        },
                        body : JSON.stringify({
                            nome : this.state.nome,
                            email : this.state.email,
                            senha : this.state.senha,
                            dataNascimento : this._dataParaFormatoJson(this.state.dataNascimento),
                        })
                    })
                    .then(response => {
                        if (response.status === 200){
                            this.props.navigation.navigate("Login") 
                        }
                    })
                    .catch(error => alert("Erro: " + error))


                }else{
                    alert("Confirme sua senha direito po :/")
                }

            }else{
                alert("Preencha todos os campos corretamente")
            }



        } catch (error) {
            alert("Erro: " + error)
        }
    }


    render() {
        return (
            <SafeAreaView>
                <StatusBar hidden={true} />
                <ImageBackground
                    source={require("../assets/img/fundo-banner.png")}
                    style={{ width: "100%", height: "100%" }}>

                    <Text style={styles.titulo}>Insira suas informações</Text>
                    <SafeAreaView style={styles.form}>
                    
                        <DatePicker
                            onDateChange={(dataNascimento) => { this.setState({dataNascimento}) }}
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
                        <TextInput
                            placeholder="Nome Completo"
                            placeholderTextColor="#FFF"
                            maxLength={255}
                            onChangeText={nome => this.setState({ nome })}
                            style={styles.input}
                        />


                        <TextInput
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCompleteType="email"
                            selectionColor="#fff"
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#FFF"
                            maxLength={140}
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nova Senha"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholderTextColor="#FFF"
                            maxLength={100}
                            onChangeText={senha => this.setState({ senha })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirme sua nova senha"
                            autoCapitalize="none"
                            secureTextEntry={true}
                            placeholderTextColor="#FFF"
                            maxLength={100}
                            onChangeText={confirmaSenha => this.setState({ confirmaSenha })}
                        />
                        <TouchableOpacity onPress={this._fazerCadastro} style={styles.submit}>
                            <Text styles={styles.textoSubmit}>Cadastrar</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ImageBackground>
            </SafeAreaView>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    content: {
        justifyContent: "space-around",
        alignItems: "center",
        height: 300,
    },
    titulo: {
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        // fontWeight : "bold"
    },
    submit: {
        backgroundColor: "#fff",
        width: "70%",
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    textoSubmit: {
        color: "#a60313",
        fontSize: 500,
    },
    input: {
        color: "#fff",
        borderBottomWidth: 2,
        borderBottomColor: "#F2EB12",
        width: "70%",
        fontSize: 15,
        fontWeight: "500",
        paddingBottom: 1,
        paddingLeft: 0,
    },
    ou: {
        color: "#F2EB12",
        fontSize: 15,
    },
    form: {
        alignItems: "center",
    },
    inputData: {
        width: "70%",
    }
})
export default Cadastro