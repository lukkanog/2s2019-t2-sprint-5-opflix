import React,{Component} from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import "../../assets/css/Cadastro.css"

export default class CadastroAdm extends Component{
    constructor(){
        super();
        this.state = {
            nome : "",
            email : "",
            senha : "",
            confirmaSenha : "",
            dataNascimento : "",
            idTipousuario : 0,

            erro : false,
            mensagemErro: "",

            tipos:[],
        }
    }

    componentDidMount(){
        let token = localStorage.getItem("usuario-opflix");

        fetch("http://192.168.4.16:5000/api/tiposusuario",{
            headers:{
                "Authorization" : "Bearer " + token,
            }
        })
        .then(response =>response.json())
        .then(data => this.setState({tipos : data}))
        .catch(error => console.log(error))
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

    atualizarEstadoPermissao = (event) =>{
        event.preventDefault();
        this.setState({idTipousuario : event.target.value})
        console.log(this.state.idTipousuario)
    }

    cadastrarUsuario = (event) =>{
        event.preventDefault();

        if (this.state.senha !== this.state.confirmaSenha){
            this.setState({
                erro : true,
                mensagemErro : "A senha está incorreta",
            })
        }else{
            let token = localStorage.getItem("usuario-opflix")
            
            fetch("http://192.168.4.16:5000/api/usuarios/cadastraradmin",{
                method : "POST",
                headers:{
                    "Authorization" : "Bearer " + token,
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    nome : this.state.nome,
                    email : this.state.email,
                    senha : this.state.senha,
                    dataNascimento : this.state.dataNascimento,
                    idTipoUsuario : this.state.idTipousuario,
                })
            })
            .then(response => console.log(response.status))
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
                        <h2>Cadastrar novo usuário</h2>
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
                                Permissão
                                <br/>
                                <select onChange={this.atualizarEstadoPermissao}>
                                    <option selected disabled>Selecione...</option>
                                    {this.state.tipos.map(element =>{
                                        return(
                                            <option value={element.idTipoUsuario} key={element.idTipoLancamento}>{element.nome}</option>
                                        )
                                    })}
                                </select>
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
                            <input type="submit" value="Cadastrar" className="submit_cadastro"/>
                        </form>
                    </div>
                </main>
                <Rodape />
            </div>
        )
    }

}//////////////////////////////////////////////////////////////////////////////////////////////////