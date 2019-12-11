import React, { Component } from "react";
import {
    FlatList,
    Text,
    SafeAreaView,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    StatusBar,
    Dimensions
} from "react-native"

class Plataformas extends Component {
    constructor() {
        super();
        this.state = {
            plataformas: null,
            nomePlataforma : null,
        }
    }

    componentDidMount() {
        this._carregarPlataformas();
    }

    _carregarPlataformas = async () => {
        try {

            let token = await AsyncStorage.getItem("@opflix:token")

            fetch("http://192.168.4.16:5000/api/plataformas", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
                .then(resposta => resposta.json())
                .then(dados => this.setState({ plataformas: dados }))
                .catch(error => alert(error))
        } catch (error) {
            alert("Caiu no catch => " + error)
        }
    }

    _cadastrarPlataforma = async() =>{
        try {
            let token = await AsyncStorage.getItem("@opflix:token");

            if (this.state.nomePlataforma == null){
                alert("Para cadastrar uma plataforma, insira um nome para ela :)")
                return
            }
            fetch("http://192.168.4.16:5000/api/plataformas",{
                method : "POST",
                headers : {
                    "Authorization" : "Bearer " + token,
                    "Content-type" : "application/json",
                    "Accept" : "application/json",
                },
                body : JSON.stringify({
                    nome : this.state.nomePlataforma
                })
            })
            .then(resposta =>{
                if (resposta.status == 200){
                    alert("Plataforma \"" + this.state.nomePlataforma + "\" Cadastrada com sucesso");
                    this.setState({nomePlataforma : null});
                }
            })
            .then(this._carregarPlataformas)
            .catch(error => alert(error))
        } catch (error) {
            alert("Ocorreu um erro inesperado. Por favor, tente mais tarde.");
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

                <Text style={styles.tituloPrincipal}>Plataformas</Text>
                <View style={styles.form}>
                    <TextInput
                        value={this.state.nomePlataforma}
                        placeholder="Adicionar Plataforma"
                        placeholderTextColor="#000"
                        blurOnSubmit={true}
                        onChangeText={nomePlataforma => this.setState({ nomePlataforma })}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.submit} onPress={this._cadastrarPlataforma}>
                        <Text style={styles.textoSubmit}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    style={styles.lista}
                    numColumns={2}
                    data={this.state.plataformas}
                    keyExtractor={item => item.idPlataforma.toString()}
                    contentContainerStyle={{
                        alignItems: "center",
                        width: "90%",
                        justifyContent: "center",
                        height: Dimensions.get("window").height,
                        justifyContent : "flex-start",
                        alignItems : "flex-start",
                    }}
                    renderItem={({ item }) => (
                        <View style={styles.box}>
                            <View style={styles.flexTexto}>
                                <Text style={styles.textoBold}>{"#" + item.idPlataforma}</Text>
                                <Text>{item.nome}</Text>
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
        // height : 2000,
        // flexDirection : "row",
        // flexWrap : "wrap",
        marginLeft: 20,
    },
    box: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#707070",
        width: "40%",
        minWidth : 140, 
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 20,
    },
    textoBold: {
        fontWeight: "bold",
    },
    form : {
        flexDirection : "row",
        alignItems : "center",
        width : "80%",
        marginHorizontal : "10%",
        justifyContent : "space-around",
        paddingVertical : 5,
    },
    input : {
        width : "80%",
        
        borderWidth : 1,
        borderColor : "#70707035",
        // borderRightWidth : 0,

        paddingVertical : 2,
        paddingHorizontal : 5,
    },
    submit : {
        backgroundColor : "#a60313",
        padding : 10,
        borderRadius : 15,
        position : "relative",
        right : 10,
    },
    textoSubmit : {
        color : "#fbe212"
    }
})

export default Plataformas