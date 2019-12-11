import React,{Component} from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import "../../assets/css/Cadastro.css"

export default class CadastroComum extends Component{
    constructor(){
        super();
        this.state = {
            nome : "",
            email : "",
            senha : "",
            confirmaSenha : "",
            dataNascimento : "",
            erro : false,
            mensagemErro: "",
        }
    }

    atualizarEstadoNome = (event) =>{
        event.preventDefault();
        this.setState({nome : event.target.value})
    }

    atualizarEstadoEmail = (event) =>{
        event.preventDefault();
        this.setState({email : event.target.value})
    }

    atualizarEstadoSenha = (event) =>{
        event.preventDefault();
        this.setState({senha : event.target.value})
    }

    atualizarEstadoConfirmaSenha = (event) =>{
        event.preventDefault();
        this.setState({confirmaSenha : event.target.value})
    }

    atualizarEstadoData = (event) =>{
        event.preventDefault();
        this.setState({dataNascimento : event.target.value})
    }

    cadastrarUsuario = (event) =>{
        event.preventDefault();


        let dia = new Date();
        let hoje = dia.getDate();
        console.log(hoje)
        if (this.state.senha !== this.state.confirmaSenha){
            this.setState({
                erro : true,
                mensagemErro : "A senha está incorreta",
            })
        }else{

            fetch("http://192.168.4.16:5000/api/usuarios",{
                method : "POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    nome : this.state.nome,
                    email : this.state.email,
                    senha : this.state.senha,
                    dataNascimento : this.state.dataNascimento,
                })
            })
            .then(response => {
                if (response.status === 200){
                    this.props.history.push("/login");
                }
            })
            .catch(error => console.log(error))
        }
    }

    render(){
        return(
            <div className="Cadastro">
                <header>
                    <Nav/>
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Cadastre-se</h2>
                        <form onSubmit={this.cadastrarUsuario}>
                            <label>
                                Nome completo
                                <br/>
                                <input onInput={this.atualizarEstadoNome} required type="text" maxLength="150"/>
                            </label>
                            <label>
                                Data de nascimento
                                <br/>
                                <input onChange={this.atualizarEstadoData} type="date" required />
                            </label>
                            <label>
                                Email
                                <br/>
                                <input onInput={this.atualizarEstadoEmail} required type="email"></input>
                            </label>
                            <label>
                                Senha
                                <br/>
                                <input onInput={this.atualizarEstadoSenha} required type="password" minLength="6" maxLength="450"/>
                            </label>
                            <label>
                                Confirmar Senha
                                <br/>
                                <input onInput={this.atualizarEstadoConfirmaSenha} required type="password" minLength="6" maxLength="450"/>
                            </label>
                                <p id="texto_erro">{this.state.mensagemErro}</p>                            
                                <input type="submit" value="Cadastrar" className="submit_cadastro link"/>
                            
                        </form>
                    </div>
                </main>
                <Rodape />
            </div>
        )
    }

}//////////////////////////////////////////////////////////////////////////////////////////////////