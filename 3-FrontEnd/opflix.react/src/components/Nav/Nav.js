import React, { Component } from "react";
import logo from "../../assets/img/icon-logo.png";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

export default class Nav extends Component {
    constructor() {
        super();
        this.state = {
            usuarioEstaLogado: false,
            permissao: "",
            fezLogout : false
        }
    }

    // componentDidUpdate(){
    //     if (this.state.fezLogout === true){
    //         console.log("saiu")
    //         this.props.history.push("/");
    //     }
    // }

    componentDidMount() {
        let user = localStorage.getItem("usuario-opflix");

        if (user != null) {
            var token = localStorage.getItem("usuario-opflix");
            let usuario = jsonwebtoken.decode(token);

            this.setState({ usuarioEstaLogado: true })
            this.setState({ permissao: usuario.permissao });
        }
    }


    efetuarLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("usuario-opflix");
        this.setState({ usuarioEstaLogado: false });
        this.setState({ permissao: "" });
        this.setState({fezLogout : true})
        // this.props.history.push("/login ")
    }

    render() {
        if (this.state.fezLogout === true){
            return(
                <Redirect to="/"/>
            )
        }
        return (
            <nav className="Nav container">
                <div className="content flexbox_nav">
                    <Link to="/" id="link_home">
                        <div className="logo_box">
                            <img src={logo} alt="Logo do OpFlix"/>
                            <h1>OpFlix</h1>
                        </div>
                    </Link>
                    {this.state.permissao === "ADMINISTRADOR" ?
                        <ul id="lista_nav">
                            <li className="option_nav"> <Link to="/adm/lancamentos">Lançamentos</Link> </li>
                            <li className="option_nav"> <Link to="/adm/categorias">Categorias</Link> </li>
                            <li className="option_nav"> <Link to="/adm/plataformas">Plataformas</Link> </li>
                            <li className="option_nav" id="link_todashboard"> <Link to="/adm/">Dashboard</Link> </li>
                            <li className="option_nav" > <a onClick={this.efetuarLogout} id="sair_nav">Sair</a> </li>
                        </ul>
                        :
                        this.state.usuarioEstaLogado == false ?
                            <ul id="lista_nav">
                                <li className="option_nav"> <Link to="/cadastro" >Cadastre-se</Link> </li>
                                <li className="option_nav"> <Link to="/login" id="login_nav">Login</Link> </li>
                            </ul>
                            :
                            <ul id="lista_nav">
                                <li className="option_nav"> <Link to="/lancamentos">Todos os lançamentos</Link> </li>
                                <li className="option_nav"> <Link to="/lancamentos/favoritos">Meus Favoritos</Link> </li>
                                <li className="option_nav"> <Link to="/lancamentos/mapa">Mapa de lançamentos</Link> </li>
                                <li className="option_nav" > <a onClick={this.efetuarLogout} id="sair_nav">Sair</a> </li>
                            </ul>
                    }
                </div>
            </nav>
        )
    }
}