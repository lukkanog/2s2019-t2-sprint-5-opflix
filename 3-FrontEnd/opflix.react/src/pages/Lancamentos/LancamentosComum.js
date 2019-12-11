import React, { Component } from "react";
import Axios from "axios";

import estrelinha from "../../assets/img/estrela.png";
// import jureg from "../../assets/img/jureg-teste.png";
import ProcurarIcon from "../../assets/img/procurar-icon.png";

import "../../assets/css/Lancamentos.css";

import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";

export default class Lancamentos extends Component {
    constructor() {
        super();
        this.state = {
            lancamentos: [],
            quantExibida: 5,

            favoritos: [],
            plataformas: [],
            categorias: [],


            idCategoria: 0,
            idPlataforma: 0,
            filtroTitulo: "",

            naoFoiEncontrado : false,
        }
    }

    atualizarPagina = () => {
        fetch("http://192.168.4.16:5000/api/lancamentos")
        .then(resposta => resposta.json())
        .then(data => {
            this.setState({lancamentos : data});
            this.setState(function (prevState) {
                if (data.length <= 0) {
                    this.setState({ naoFoiEncontrado: true });
                } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                    this.setState({ naoFoiEncontrado: false })
                }
            })
        })
    }

    carregarCategorias = () => {
        try {
            let token = localStorage.getItem("usuario-opflix");

            fetch("http://192.168.4.16:5000/api/categorias", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
                .then(resposta => resposta.json())
                .then(data => this.setState({ categorias: data }))
                .catch(error => console.log(error));
        } catch (error) {
            alert(error);
        }
    }

    carregarPlataformas = () => {
        try {
            let token = localStorage.getItem("usuario-opflix");

            fetch("http://192.168.4.16:5000/api/plataformas", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(resposta => resposta.json())
                .then(data => this.setState({ plataformas: data }))
                .catch(error => console.log(error));
        } catch (error) {
            alert(error);
        }
    }

    carregarFavoritos = () => {
        const urlFavoritos = "http://192.168.4.16:5000/api/favoritos";
        let token = localStorage.getItem("usuario-opflix");

        Axios.get(urlFavoritos, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ favoritos: response.data });
                } else {
                    console.log("deu ruim nos favorito" + response.status)
                }
            })
            .catch(error => console.log(error))
    }

    atualizarEstadoTitulo = (event) => {
        event.preventDefault();
        this.setState({ filtroTitulo: event.target.value });
        this.setState({idPlataforma : 0, idCategoria : 0});
    }

    atualizarEstadoCategoria = (event) => {
        event.preventDefault();
        this.setState({ idCategoria: event.target.value });
        this.setState({idPlataforma : 0, filtroTitulo : ""})

    }

    atualizarEstadoPlataforma = (event) => {
        event.preventDefault();
        this.setState({ idPlataforma: event.target.value });
        this.setState({idCategoria : 0, filtroTitulo : ""})

    }

    componentDidMount() {
        this.atualizarPagina();
        this.carregarFavoritos();
        this.carregarCategorias();
        this.carregarPlataformas();
    }


    foiFavoritado = (id) => {
        let bool = false;
        this.state.favoritos.forEach(element => {
            if (element.idLancamento === id) {
                bool = true;
                return bool;
            }
        })
        return bool;
    }

    favoritar = (id) => {
        let token = localStorage.getItem("usuario-opflix");
        if (token === null) {
            this.setState({ redirectToLogin: true })
        } else {


            fetch("http://192.168.4.16:5000/api/favoritos", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    idLancamento: id
                })
            })
                .then(() => this.adicionarAoEstadoFavoritos(id))
                .catch(error => console.log(error))
        }
    }

    desfavoritar = (id) => {
        let token = localStorage.getItem("usuario-opflix");
        if (token === null) {
            this.setState({ redirectToLogin: true })
        } else {


            fetch("http://192.168.4.16:5000/api/favoritos/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
                .then(() => this.removerDoEstadoFavoritos(id))
                .catch(error => console.log(error))
        }
    }

    formatarData = (element) => {
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano);
    }

    adicionarAoEstadoFavoritos = (id) => {
        var lancamento = this.buscarLancamentoPorId(id);

        this.setState((prevState, props) => ({
            favoritos: this.state.favoritos.concat(lancamento)
        }));
    }

    removerDoEstadoFavoritos = (id) => {
        let lista = this.state.favoritos;
        lista = lista.filter(element => {
            return element.idLancamento !== id;
        })
        this.setState({ favoritos: lista })
    }


    buscarLancamentoPorId = (idLancamento) => {
        let lancamento = this.state.lancamentos.find(element => {
            return element.idLancamento === idLancamento;
        });
        return lancamento;
    }


    filtrarPorTitulo = (event) => {
        event.preventDefault();
        var token = localStorage.getItem("usuario-opflix");

        try {

            if (this.state.filtroTitulo !== null && this.state.filtroTitulo !== "" && this.state.filtroTitulo.length >= 1) {

                fetch("http://192.168.4.16:5000/api/lancamentos/buscar/" + this.state.filtroTitulo, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ lancamentos: data });

                        this.setState(function (prevState) {
                            if (data.length <= 0) {
                                this.setState({ naoFoiEncontrado: true });
                            } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                                this.setState({ naoFoiEncontrado: false })
                            }
                        });
                    })
                    .then(this.setState({ filtroTitulo: "" }))
                    .catch(error => console.log(error))
            }
        } catch (error) {
            this.atualizarPagina();
        }
    }

    filtrarPorCategoria = (event) => {
        event.preventDefault();
        var token = localStorage.getItem("usuario-opflix");

        try {

            if (this.state.idCategoria !== "" && this.state.idCategoria !== 0) {

                fetch("http://192.168.4.16:5000/api/lancamentos/filtrar/categoria/" + this.state.idCategoria, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ lancamentos: data });
                        this.setState(function (prevState) {
                            if (data.length <= 0) {
                                this.setState({ naoFoiEncontrado: true });
                            } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                                this.setState({ naoFoiEncontrado: false })
                            }
                        })
                    })
                    .catch(error => console.log(error))
            }
        } catch (error) {
            alert(error)
        }
    }

    filtrarPorPlataforma = (event) => {
        event.preventDefault();
        var token = localStorage.getItem("usuario-opflix");

        try {

            if (this.state.idPlataforma !== "" && this.state.idPlataforma !== 0) {

                fetch("http://192.168.4.16:5000/api/lancamentos/filtrar/plataforma/" + this.state.idPlataforma, {
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                    .then(resposta => resposta.json())
                    .then(data => {
                        this.setState({ lancamentos: data });

                        this.setState(function (prevState) {
                            if (data.length <= 0) {
                                this.setState({ naoFoiEncontrado: true });
                            } else if (data.length >= 1 && prevState.naoFoiEncontrado === true) {
                                this.setState({ naoFoiEncontrado: false })
                            }
                        })
                    })
                    .catch(error => console.log(error))
            }
        } catch (error) {
            alert(error)
        }
    }

    exibirMaisTres = (event) => {
        event.preventDefault();
        this.setState({ quantExibida: this.state.quantExibida + 3 })
    }


    render() {
        return (
            <div className="Lancamentos">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">

                        <h2>Lista de Lançamentos</h2>

                        <div className="flex-forms">
                            <form className="form-filtro" onSubmit={this.filtrarPorTitulo}>
                                <label className="flex-form-titulo">
                                    <div>
                                        <img alt="" src={ProcurarIcon}></img>
                                        <span>Buscar</span>
                                    </div>
                                    <input onInput={this.atualizarEstadoTitulo} value={this.state.titulo} type="text" minLength="1" maxLength="60" placeholder="Título do lançamento buscado" />
                                </label>
                                <input type="submit" value="Procurar" id="submit-titulo" />
                            </form>

                            <form onSubmit={this.filtrarPorCategoria} className="form-filtro smaller">
                                <span className="titulo-form">Filtrar por categoria</span>
                                <br />

                                <select onChange={this.atualizarEstadoCategoria} className="select"  value={this.state.idCategoria}>
                                    <option disabled value={0}>Selecione...</option>
                                    {this.state.categorias.map(element => {
                                        return <option label={element.nome} value={element.idCategoria} key={element.idCategoria} />
                                    })}
                                </select>
                                <input type="submit" value="Filtrar" className="submit-select" />

                            </form>

                            <form onSubmit={this.filtrarPorPlataforma} className="form-filtro smaller">
                                <span className="titulo-form">Filtrar por plataforma</span>
                                <br />

                                <select onChange={this.atualizarEstadoPlataforma} className="select" value={this.state.idPlataforma}>
                                    <option disabled value={0}>Selecione...</option>
                                    {this.state.plataformas.map(element => {
                                        return <option label={element.nome} value={element.idPlataforma} key={element.idPlataforma} />
                                    })}
                                </select>
                                <input type="submit" value="Filtrar" className="submit-select" />


                            </form>
                        </div>

                        <button className="limpar_filtros" onClick={this.atualizarPagina}>Limpar Filtros</button>


                        {this.state.naoFoiEncontrado === false ? null : 
                        <p className="alert">
                            Resultado não encontrado :/
                        </p>
                        }
                        {this.state.lancamentos.slice(0, this.state.quantExibida).map(element => {
                            return (
                                <div className="box_lancamento" key={element.idLancamento}>
                                    <div className="textos_e_capa">
                                        <div>
                                            <h4 className="titulo_lancamento">{element.titulo}</h4>
                                            <p className="caracteristicas_lancamento"><b>Tipo: </b>{element.idTipoLancamentoNavigation.nome}</p>
                                            <p className="caracteristicas_lancamento"><b>Gênero: </b>{element.idCategoriaNavigation.nome}</p>
                                            <p className="caracteristicas_lancamento"><b>Plataforma: </b>{element.idPlataformaNavigation.nome}</p>
                                            {element.idTipoLancamentoNavigation.nome === "Serie" ?
                                                <p className="caracteristicas_lancamento"><b>Duração: </b>{element.duracao + " minutos por episódio"}</p>
                                                :
                                                <p className="caracteristicas_lancamento"><b>Duração: </b>{element.duracao + " minutos"}</p>
                                            }

                                            <p className="caracteristicas_lancamento sinopse" ><b>Sinopse: </b>{element.sinopse}</p>
                                        </div>
                                        <div>
                                            {/* <img src={jureg} className="capa_lancamento" alt={"capa de " + element.titulo} title={"capa de " + element.titulo} /> */}
                                        </div>
                                    </div>

                                    <div className="data_e_btn">
                                        <p className="data_lancamento">{this.formatarData(element)}</p>

                                        {this.foiFavoritado(element.idLancamento) !== true ?
                                            <button className="btn_favoritar" id={"favoritar_" + element.idLancamento} onClick={() => this.favoritar(element.idLancamento)}>
                                                <img alt="favoritar" src={estrelinha} className="estrelinha_btn_favoritar"/>
                                                <p className="texto_btn_favoritar">Adicionar aos favoritos</p>
                                            </button>
                                            :
                                            <button className="btn_desfavoritar" onClick={() => this.desfavoritar(element.idLancamento)}>
                                                <img alt="Desfavoritar" src={estrelinha} className="estrelinha_btn_favoritar" />
                                                <p className="texto_btn_favoritar">Favorito</p>
                                            </button>
                                        }
                                    </div>
                                </div>
                            )//return foreach
                        })}
                        {this.state.quantExibida < this.state.lancamentos.length ?
                            <button onClick={this.exibirMaisTres} id="btn_ver_mais" className="link">Mostrar     mais</button>
                            :
                            <span />
                        }
                    </div>
                </main>
                <Rodape />
            </div>
        )//return
    }//render
}