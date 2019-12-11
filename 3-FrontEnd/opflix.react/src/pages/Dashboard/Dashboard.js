import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import jsonwebtoken from "jsonwebtoken";
import { Link } from "react-router-dom";
import "../../assets/css/Dashboard.css";
import setinha from "../../assets/img/arrow.png";


export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            nomeAdm: ""
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("usuario-opflix");
        let user = jsonwebtoken.decode(token);
        let nome = user.nome;
        this.setState({ nomeAdm: nome });
    }

    render() {
        return (
            <div className="Dashboard">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Seja bem vindo, {this.state.nomeAdm}</h2>
                        <div id="flex_dashboard">
                            <ul>
                                <li>
                                    <Link className="link_dashboard" to="/adm/lancamentos">
                                        Lançamentos
                                        <img src={setinha} className="setinha" />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link_dashboard" to="/adm/categorias">
                                        Categorias
                                        <img src={setinha} className="setinha" />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="link_dashboard" to="/adm/plataformas">
                                        Plataformas
                                    <img src={setinha} className="setinha" />
                                    </Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link className="link_dashboard" to="/adm/lancamentos/cadastrar">
                                        Cadastrar lançamento
                                        <img src={setinha} className="setinha" />
                                    </Link>
                                </li>

                                <li>
                                    <Link className="link_dashboard" to="/adm/cadastro">
                                        Cadastrar usuário
                                        <img src={setinha} className="setinha" />
                                    </Link>
                                </li>

                                <li>
                                    <Link className="link_dashboard" to="/lancamentos/mapa">
                                        Ver Mapa de Lançamentos
                                        <img src={setinha} className="setinha" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
                <Rodape />
            </div>
        )
    }
}