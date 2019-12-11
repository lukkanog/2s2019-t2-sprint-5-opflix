import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";


import "../../assets/css/CadastrarLancamento.css";

export default class EditarLancamento extends Component {
    constructor() {
        super();
        this.state = {
            // idLancamento : "",
            redirecionar: false,

            categorias: [],
            plataformas: [],
            tipos: [],

            idCategoria: "",
            idTipoLancamento: "",
            idPlataforma: "",
            titulo: "",
            duracao: "",
            sinopse: "",
            dataLancamento: "",
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("usuario-opflix");
        try {
            let idPassado = this.props.location.state.idLancamento;


            fetch("http://192.168.4.16:5000/api/lancamentos/" + idPassado, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        // lancamento : data,
                        sinopse: data.sinopse,
                        dataLancamento: data.dataLancamento,
                        duracao: data.duracao,
                        idCategoria: data.idCategoria,
                        idPlataforma: data.idPlataforma,
                        idTipoLancamento: data.idTipoLancamento,
                        titulo: data.titulo,
                    })
                })
                .then(console.log(this.state))
                .catch(error => console.log(error))

            let urlCategorias = "http://192.168.4.16:5000/api/categorias";
            let urlTipos = "http://192.168.4.16:5000/api/tiposlancamento";
            let urlPlataformas = "http://192.168.4.16:5000/api/plataformas";

            fetch(urlTipos, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ tipos: data }))
                .catch(error => console.log(error))

            fetch(urlCategorias, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ categorias: data }))
                .catch(error => console.log(error))

            fetch(urlPlataformas, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(response => response.json())
                .then(data => this.setState({ plataformas: data }))
                .catch(error => console.log(error))
        } catch (error) {
            this.setState({redirecionar : true})
        }
    }

    atualizarEstadoTitulo = (event) => {
        event.preventDefault();
        this.setState({ titulo: event.target.value })
    }

    atualizarEstadoCategoria = (event) => {
        event.preventDefault();
        this.setState({ idCategoria: event.target.value })
    }

    atualizarEstadoPlataforma = (event) => {
        event.preventDefault();
        this.setState({ idPlataforma: event.target.value })
    }

    atualizarEstadoTipo = (event) => {
        event.preventDefault();
        this.setState({ idTipoLancamento: event.target.value })
    }

    atualizarEstadoData = (event) => {
        event.preventDefault();
        this.setState({ dataLancamento: event.target.value })
    }


    atualizarEstadoDuracao = (event) => {
        event.preventDefault();
        this.setState({ duracao: event.target.value });
    }

    atualizarEstadoSinopse = (event) => {
        event.preventDefault();
        this.setState({ sinopse: event.target.value });
        console.log(this.state)
    }

    editarLancamento = (event) => {
        event.preventDefault();
        console.log(this.state)
        let token = localStorage.getItem("usuario-opflix");
        let idPassado = this.props.location.state.idLancamento;

        fetch("http://192.168.4.16:5000/api/lancamentos/" + idPassado, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                idCategoria: this.state.idCategoria,
                idPlataforma: this.state.idPlataforma,
                idTipoLancamento: this.state.idTipoLancamento,
                titulo: this.state.titulo,
                sinopse: this.state.sinopse,
                dataLancamento: this.state.dataLancamento,
                duracao: this.state.duracao,
            })
        })
            .then(this.setState({ redirecionar: true }))
            .catch(error => console.log(error))
    }


    render() {
        if (this.state.redirecionar === true) {
            return (
                <Redirect to="/adm/lancamentos" />
            )
        } else {

            return (
                <div className="EditarLancamento">
                    <header>
                        <Nav />
                    </header>
                    <main className="container">
                        <div className="content">
                            <h2>Editar - {this.state.titulo}</h2>
                            <form id="form_lancamento" onSubmit={this.editarLancamento}>

                                <label className="grupo_input">
                                    Título
                                <br />
                                    <input defaultValue={this.state.titulo} onInput={this.atualizarEstadoTitulo} type="text" minLength="1" maxLength="100" required className="input_lancamento" />
                                </label>

                                <label className="grupo_input">
                                    Data de lançamento
                                <br />
                                    <input type="date" onChange={this.atualizarEstadoData} required className="input_lancamento" />
                                </label>

                                <label className="grupo_input">
                                    Tipo
                                <br />
                                    <select onChange={this.atualizarEstadoTipo} required className="input_lancamento select_lancamento">
                                        <option disabled selected>Selecione</option>
                                        {this.state.tipos.map(element => {
                                            return (
                                                <option value={element.idTipoLancamento} key={element.idTipoLancamento}>{element.nome}</option>
                                            )
                                        })}
                                    </select>
                                </label>

                                <label className="grupo_input">
                                    Gênero
                                <br />
                                    <select onChange={this.atualizarEstadoCategoria} required className="input_lancamento select_lancamento">
                                        <option defaultChecked disabled>Selecione</option>
                                        {this.state.categorias.map(element => {
                                            return (
                                                <option key={element.idCategoria} value={element.idCategoria}>{element.nome}</option>
                                            )
                                        })}
                                    </select>
                                </label>

                                <label className="grupo_input">
                                    Plataforma
                                <br />
                                    <select onChange={this.atualizarEstadoPlataforma} required className="input_lancamento select_lancamento">
                                        <option disabled selected>Selecione</option>
                                        {this.state.plataformas.map(element => {
                                            return (
                                                <option key={element.idPlataforma} value={element.idPlataforma}>{element.nome}</option>
                                            )
                                        })}
                                    </select>
                                </label>

                                <label className="grupo_input">
                                    Duração (em minutos)
                                <br />
                                    <input onChange={this.atualizarEstadoDuracao} defaultValue={this.state.duracao} type="number" min="1" max="1000" required className="input_lancamento" />
                                </label>

                                <label className="grupo_input">
                                    Sinopse
                                <br />
                                    <textarea onInput={this.atualizarEstadoSinopse} defaultValue={this.state.sinopse} minLength="10" maxLength="800" id="textArea_sinopse" required className="input_lancamento" placeholder="Escreva aqui a sinopse" />
                                </label>

                                <input type="submit" value="Salvar alterações" id="btn_submit_lancamento" />

                            </form>
                        </div>
                    </main>
                    <Rodape />
                </div>
            )
        }
    }
}
