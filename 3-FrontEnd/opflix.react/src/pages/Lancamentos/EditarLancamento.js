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

            latitude: "",
            longitude: "",

            localizacao: {},
            // naoTemLocalizacao: true,
        }
    }

    componentDidMount() {
        this.carregarLancamento();
        this.carregarCategorias();
        this.carregarPlataformas();
        this.carregarTipos();
    }


    carregarLancamento = () => {
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
                .then(() => this.carregarLocalizacao(this.state.titulo))
                .catch(error => console.log(error))



        } catch (error) {
            this.setState({ redirecionar: true })
        }
    }

    carregarLocalizacao = (titulo) => {
        console.log("location")
        let token = localStorage.getItem("usuario-opflix");

        try {
            fetch("http://192.168.4.16:5000/api/localizacoes/" + titulo, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
                .then(resposta => resposta.json())
                .then(data => {
                    this.setState({ localizacao: data });
                    this.setState({ latitude: data.latitude });
                    this.setState({ longitude: data.longitude });
                })
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }

    }



    carregarTipos = () => {
        let token = localStorage.getItem("usuario-opflix");
        let urlTipos = "http://192.168.4.16:5000/api/tiposlancamento";
        fetch(urlTipos, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ tipos: data }))
            .catch(error => console.log(error))
    }

    carregarCategorias = () => {
        let token = localStorage.getItem("usuario-opflix");
        let urlCategorias = "http://192.168.4.16:5000/api/categorias";

        fetch(urlCategorias, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ categorias: data }))
            .catch(error => console.log(error))

    }

    carregarPlataformas = () => {
        let token = localStorage.getItem("usuario-opflix");
        let urlPlataformas = "http://192.168.4.16:5000/api/plataformas";
        fetch(urlPlataformas, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ plataformas: data }))
            .catch(error => console.log(error))

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
    }

    atualizarEstadoLatitude = (event) => {
        event.preventDefault();
        this.setState({ latitude: event.target.value });
    }

    atualizarEstadoLongitude = (event) => {
        event.preventDefault();
        this.setState({ longitude: event.target.value })
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
            // .then(this.setState({ redirecionar: true }))
            .catch(error => console.log(error))




        var parsedLat = parseFloat(this.state.latitude);
        var parsedLng = parseFloat(this.state.longitude);

        try {
            if (this.state.latitude !== "" && this.state.longitude !== "" && this.state.latitude !== null && this.state.longitude !== null && !isNaN(parsedLat) && !isNaN(parsedLng)) {
                fetch("http://192.168.4.16:5000/api/localizacoes/" + this.state.localizacao.lancamento.titulo, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Bearer " + token,
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        lancamento: {
                            titulo: this.state.titulo,
                            dataLancamento: this.state.dataLancamento,
                        }
                    })
                })
                    .then(resposta => resposta.json())
                    .then(data => console.log(data))
                    .catch(error => console.log(error))
            }//ifff

        } catch (error) {
            alert(error)
        }
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
                                    <input type="date" onChange={this.atualizarEstadoData} className="input_lancamento" />
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

                                {this.state.localizacao.latitude === undefined || this.state.localizacao.longitude === undefined ? null :
                                    <div id="box_location_input">
                                        <div>

                                            <p>Localização </p>

                                            <div>

                                                <label className="grupo_input_location">
                                                    Latitude
                                    <br />
                                                    <input
                                                        className="input_location"
                                                        onInput={this.atualizarEstadoLatitude}
                                                        value={this.state.latitude}
                                                    />
                                                </label>


                                                <label className="grupo_input_location">
                                                    Longitude
                                    <br />
                                                    <input
                                                        className="input_location"
                                                        onInput={this.atualizarEstadoLongitude}
                                                        value={this.state.longitude}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        {/* <img src={locationIcon} alt="Ícone de localização" id="location-icon-input"/> */}
                                    </div>
                                }

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
