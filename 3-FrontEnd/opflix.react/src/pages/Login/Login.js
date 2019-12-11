import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import { Link } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

import "../../assets/css/Login.css";
import Axios from "axios";


export default class Login extends Component {
    constructor() {
        super();
        localStorage.removeItem("usuario-opflix");
        this.state = {
            email: "",
            senha: "",
            incorreto: false,
            foiRedirecionado: false,
        }
        console.log(this.state)
    }

    componentWillMount() {
        try {
            if (this.props.location.state.foiRedirecionado === true) {
                this.setState({ foiRedirecionado: true });
            }

        } catch (error) {
            this.setState({ foiRedirecionado: false });
        }

    }

    atualizarEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value })
    }

    atualizarSenha = (event) => {
        event.preventDefault();
        this.setState({ senha: event.target.value })
    }

    efetuarLogin = (event) => {
        event.preventDefault();

        let url = "http://192.168.4.16:5000/api/login";
        
        Axios.post(url, {
            email: this.state.email,
            senha: this.state.senha,
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem("usuario-opflix", response.data.token);

                    let token = localStorage.getItem("usuario-opflix");
                    if (jsonwebtoken.decode(token).permissao === "ADMINISTRADOR") {
                        this.props.history.push("/adm/")
                    } else {
                        this.props.history.push("/");
                    }
                }else{
                    console.log(response.data.mensagem);
                }
            })
            .catch(error => () => {
                console.log(error);
            })

        // fetch(url, {
        //     method: "POST",
        //     body: JSON.stringify({
        //         email: this.state.email,
        //         senha: this.state.senha,
        //     }),
        //     headers:{
        //         "Content-type" : "application/json",
        //     }
        // })
        // .then(response => {
        //     response.json();
        //     if (response.status == 200) {
        //         localStorage.setItem("usuario-opflix", response.data.token);

        //         let token = localStorage.getItem("usuario-opflix");
        //         if (jsonwebtoken.decode(token).permissao === "ADMINISTRADOR") {
        //             this.props.history.push("/adm/")
        //         } else {
        //             this.props.history.push("/");
        //         }
        //     }
        // })
        // .then(data => console.log(data))
        // .catch(error => console.log(error))
    }


    render() {
        return (
            <div className="Login">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        {this.state.foiRedirecionado === true ?
                            <p className="texto_alerta">Você precisa estar logado para essa ação!</p>
                            :
                            <span />
                        }

                        <h2>Entrar</h2>
                        <form onSubmit={this.efetuarLogin} id="form_login">
                            <label>
                                Email
                                <br />
                                <input onInput={this.atualizarEmail} type="email" placeholder="usuario@email.com" className="input_login" />
                            </label>
                            <label>
                                Senha
                                <br />
                                <input onInput={this.atualizarSenha} type="password" placeholder="*******" className="input_login" />
                            </label>
                            <input type="submit" value="Entrar" id="submit_login" />
                            {this.state.incorreto === true ?
                                <p className="texto_alerta">Usuário ou senha incorretos</p>
                                :
                                <span />
                            }
                            <p>Ainda não tem uma conta? <Link to="/cadastro" className="link_toblack">Cadastre-se</Link></p>
                        </form>
                    </div>
                </main>
                <Rodape />
            </div>
        )
    }
}