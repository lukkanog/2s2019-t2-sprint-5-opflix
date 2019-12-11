import React, {Component} from "react";
import backgroundImage from "../assets/img/fundo-banner.png";
import JwtDecode from "jwt-decode";

import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    ImageBackground,
    StatusBar
    } from "react-native";

import Axios from "axios";

class Login extends Component{
    constructor(){
        super();
        this.state = {
            // email : null,
            // senha : null,


            //PARA ENTRAR COMO ADM:
            // email : "erik@email.com",
            // senha : "123456",

            //PARA ENTRAR COMO USUARIO COMUM:
            email : "lucas@email.com",
            senha : "123456",

            naoFoiEncontrado : false,
        }
    }

    _fazerLogin = async() =>{

        await Axios.post("http://192.168.4.16:5000/api/login",{
            email : this.state.email,
            senha : this.state.senha,
        })
        .then(response => {
            if (response.status === 200){
                let token = response.data.token;
                this._redirecionarParaMain(token);
            }else if (response.status === 404){
                this.setState({naoFoiEncontrado : true})
                alert("Email ou senha incorretos.")
            }
        })
        .catch(error => {
            console.warn("erro : " + error)
            if (error.status === 404){
                this.setState({naoFoiEncontrado : true})
                alert("Email ou senha incorretos.")

            }
        })

    }

    _redirecionarParaMain = async(token) =>{
        if (token !== null){
            try {
                await AsyncStorage.setItem("@opflix:token",token)
                let usuario = JwtDecode(token);
                
                if (usuario.permissao == "ADMINISTRADOR"){
                    this.props.navigation.navigate("AdmDrawerNavigator")
                }else{
                    this.props.navigation.navigate("DrawerNavigator");
                }
            } catch (error) {
                console.warn("caiu no catch")
            }
        }
    }


    render(){ 
        return(
            <SafeAreaView>
                <StatusBar hidden={true}/>
                <ImageBackground source={require("../assets/img/fundo-banner.png")} style={{width : "100%", height : "100%"}}>
                    <View  style={styles.container}>
                        <View style={styles.content}>
                            <Text style={styles.titulo}>OpFlix</Text>
                            <View>
                                <TextInput 
                                keyboardType="email-address"
                                autoCapitalize="none" 
                                autoCompleteType="email" 
                                selectionColor="#fff"
                                style={styles.input} 
                                placeholder="Email" 
                                placeholderTextColor="#FFF" 
                                maxLength={140}
                                onChangeText={email => this.setState({email})} 
                                />    
                                <TextInput 
                                style={styles.input}  
                                placeholder="Senha" 
                                autoCapitalize="none" 
                                secureTextEntry={true}
                                placeholderTextColor="#FFF" 
                                maxLength={100}
                                onChangeText={senha => this.setState({senha}) } 
                                />    
                            </View>
                            <TouchableOpacity onPress={this._fazerLogin} style={styles.submit}>
                                <Text styles={styles.textoSubmit}>Entrar</Text>
                            </TouchableOpacity>
                            <Text style={styles.ou}>ou</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Cadastro")}>
                                <Text style={styles.btnCadastreSe}>Cadastre-se</Text>
                            </TouchableOpacity>

                            {this.state.naoFoiEncontrado === true ?
                                <Text>Email ou senha incorretos</Text>
                                :
                                null
                            }
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        alignItems : "center",
        justifyContent : "center",
        height : "100%",
    },
    content : {
        justifyContent : "space-around",
        alignItems : "center",
        height : 300,
    },
    titulo : {
        color : "#fff",
        fontSize : 100,
        textAlign : "center",
        marginTop : -50,
        // fontWeight : "bold"
    },
    submit : {
        backgroundColor : "#fff",
        width : 280,
        paddingVertical : 10,
        justifyContent : "center",
        alignItems : "center",
        marginTop : 20,
    },
    textoSubmit : {
        color : "#a60313",
        fontSize : 500,
    },
    input : {
        color : "#fff",
        borderBottomWidth : 2,   
        borderBottomColor : "#F2EB12",
        width : 280,
        fontSize : 15,
        fontWeight : "800",
        paddingBottom : 1,
        paddingLeft : 0,
    },
    ou : {
        color : "#F2EB12",
        fontSize : 15,
    },
    btnCadastreSe:{
        color : "#F2EB12",
        fontSize : 20,
        fontWeight : "bold",
    }
})
export default Login;