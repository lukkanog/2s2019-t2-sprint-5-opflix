import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import "../../assets/css/CadastrarLancamento.css";
import Axios from "axios";
import { Redirect, } from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape";
import locationIcon from "../../assets/img/location-icon.png"



class CadastrarLancamento extends Component {
    constructor() {
        super();
        this.state = {
            categorias: [],
            plataformas: [],
            tipos: [],

            idCategoria: "",
            idTipoLancamento: "",
            idPlataforma: "",
            titulo: "",
            duracao: 0,
            sinopse: "",
            dataLancamento: "",

            latitude: null,
            longitude: null,

            jaFoiCadastrado: false,
        }
    }


    componentDidMount() {
        let urlCategorias = "http://192.168.4.16:5000/api/categorias";
        let urlTipos = "http://192.168.4.16:5000/api/tiposlancamento";
        let urlPlataformas = "http://192.168.4.16:5000/api/plataformas";

        let token = localStorage.getItem("usuario-opflix");

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
        this.setState({ sinopse: event.target.value })
    }

    atualizarEstadoLatitude = (event) => {
        event.preventDefault();
        this.setState({ latitude: event.target.value });
        console.log(parseFloat(event.target.value));
    }

    atualizarEstadoLongitude = (event) => {
        event.preventDefault();
        this.setState({ longitude: event.target.value })
    }

    cadastrarLancamento = (event) => {
        event.preventDefault();
        console.log(this.state)

        let token = localStorage.getItem("usuario-opflix");
        
        console.log(this.state.latitude);
        console.log(this.state.longitude);

        var parsedLat = parseFloat(this.state.latitude);
        var parsedLng = parseFloat(this.state.longitude);

        console.log(parsedLat);
        console.log(parsedLng);

                    
            if (this.state.latitude != null && this.state.longitude !== null && !isNaN(parsedLat) && !isNaN(parsedLng)){
                Axios.post("http://192.168.4.16:5000/api/localizacoes", {
                    latitude : this.state.latitude,
                    longitude : this.state.longitude,
                    lancamento : {
                        titulo : this.state.titulo,
                        dataLancamento : this.state.dataLancamento
                    }
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                .then(response => console.log(response.status))
                .catch(error => console.log(error))
            }else{
                console.log("erro na localizacao")
            }
   

            

        Axios.post("http://192.168.4.16:5000/api/lancamentos", {
            idCategoria: this.state.idCategoria,
            idPlataforma: this.state.idPlataforma,
            idTipoLancamento: this.state.idTipoLancamento,
            titulo: this.state.titulo,
            sinopse: this.state.sinopse,
            duracao: this.state.duracao,
            dataLancamento: this.state.dataLancamento,
        }, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => console.log(response.status))
            .then(this.setState({ jaFoiCadastrado: true }))
            .catch(error => console.log(error))

    }


    render() {
        if (this.state.jaFoiCadastrado === true) {
            return (
                <Redirect to={{ pathname: "/adm/lancamentos" }} />
            )
        } else {
            return (
                <div className="CadastrarLancamento">
                    <header>
                        <Nav />
                    </header>
                    <main className="container">
                        <div className="content">
                            <h2>Novo lançamento</h2>
                            <form id="form_lancamento" onSubmit={this.cadastrarLancamento}>

                                <label className="grupo_input">
                                    Título
                                <br />
                                    <input onInput={this.atualizarEstadoTitulo} className="" type="text" minLength="1" maxLength="100" required className="input_lancamento" />
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
                                        <option disabled selected>Selecione</option>
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
                                    <input onChange={this.atualizarEstadoDuracao} type="number" min="1" max={1000} required className="input_lancamento" />
                                </label>

                                <label className="grupo_input">
                                    Sinopse
                                    <br />
                                    <textarea onInput={this.atualizarEstadoSinopse} minLength="10" maxLength="800" id="textArea_sinopse" required className="input_lancamento" placeholder="Escreva aqui a sinopse" />
                                </label>

                                <div id="box_location_input">
                                    <div>

                                        <p>Localização (opcional)</p>

                                        <div>

                                            <label className="grupo_input_location">
                                                Latitude
                                    <br />
                                                <input
                                                    // type="number"
                                                    // min={-90} max={90}
                                                    className="input_location"
                                                    // pattern="^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$"                                                    
                                                    onInput={this.atualizarEstadoLatitude}
                                                />
                                            </label>


                                            <label className="grupo_input_location">
                                                Longitude
                                    <br />
                                                <input
                                                    // type="number"
                                                    // min={-90} max={90}
                                                    className="input_location"
                                                    // pattern="^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$"
                                                    onInput={this.atualizarEstadoLongitude}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    {/* <img src={locationIcon} alt="Ícone de localização" id="location-icon-input"/> */}
                                </div>

                                <input type="submit" value="Cadastrar lançamento" id="btn_submit_lancamento" />

                            </form>
                        </div>
                    </main>
                    <Rodape />
                </div>
            )
        }
    }
}
export default CadastrarLancamento;