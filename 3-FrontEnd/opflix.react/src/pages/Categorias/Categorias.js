import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";

import "../../assets/css/Categorias.css"

export default class Categorias extends Component {
    constructor() {
        super();
        this.state = {
            categorias: [],

            nomeCategoria: "",
        }
    }
    componentDidMount() {
        this.atualizarLista();
    }

    atualizarLista(){
        const url = "http://192.168.4.16:5000/api/categorias";
        const token = localStorage.getItem("usuario-opflix");

        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            // fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ categorias: data }))
            .then(console.log(this.state))
            .catch(error => console.log(error))
    }


    atualizarEstadoNome = (event) =>{
        event.preventDefault();
        this.setState({nomeCategoria : event.target.value})
    }

    cadastrarCategoria = (event) =>{
        event.preventDefault();

        const url = "http://192.168.4.16:5000/api/categorias";
        const token = localStorage.getItem("usuario-opflix");

        fetch(url,
            {
                method: "POST",
                body:JSON.stringify({
                    nome : this.state.nomeCategoria
                }),
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": "Bearer " + token
            }
        })
        .then(() => this.atualizarLista())
        .catch(error => console.log(error))
    }


    render() {
        return (
            <div className="Categorias">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Categorias</h2>
                        <table className="tabela">
                            <thead>
                                <tr className="linha_cabecalho_tabela">
                                    <th>ID</th>
                                    <th>Categoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categorias.map(element =>{
                                    return(
                                        <tr>
                                            <td>{element.idCategoria}</td>
                                            <td>{element.nome}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                            {/* <h3>Cadastrar nova categoria</h3> */}
                            <form onSubmit={this.cadastrarCategoria} className="form_categoria-plataforma">
                                <label>
                                    Cadastrar nova categoria
                                    <br/>
                                    <input type="text"  onInput={this.atualizarEstadoNome} maxLength="70" minLength="1" placeholder="Insira o nome da categoria"/>
                                </label>
                                <input type="submit" value="Cadastrar categoria" className="link"/>
                            </form>
                    </div>
                </main>
                <Rodape />
            </div>

        )//return
    }//render
}