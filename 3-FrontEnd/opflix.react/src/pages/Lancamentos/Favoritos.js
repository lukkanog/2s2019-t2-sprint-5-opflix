import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import estrelinha from "../../assets/img/estrela.png";
// import jureg from "../../assets/img/jureg-teste.png";
import Rodape from "../../components/Rodape/Rodape";


export default class Favoritos extends Component {
    constructor() {
        super();
        this.state = {
            lancamentos: []
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("usuario-opflix");

        fetch("http://192.168.4.16:5000/api/favoritos", {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ lancamentos: data })
            })
            .catch(error => console.log(error))
    }

    formatarData = (element) => {
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano);
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


    desfavoritar = (id) => {
        let token = localStorage.getItem("usuario-opflix");

        fetch("http://192.168.4.16:5000/api/favoritos/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(this.atualizarLista(id))
            .catch(error => console.log(error))
    }

    atualizarLista = (id) => {
        let listaAntiga = this.state.lancamentos;
        let lista = listaAntiga.filter(element => {
            return element.idLancamento !== id;
        })
        this.setState({ lancamentos: lista })
    }


    render() {
        return (
            <div className="Lancamentos">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Minha lista</h2>

                        {this.state.lancamentos.map(element => {
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
                                            {/* <img src={jureg} className="capa_lancamento" alt={"capa de " +element.titulo} title={"capa de " + element.titulo}/>    */}
                                        </div>
                                    </div>

                                    <div className="data_e_btn">
                                        <p className="data_lancamento">{this.formatarData(element)}</p>
                                        <button className="btn_desfavoritar" onClick={() => this.desfavoritar(element.idLancamento)}>
                                            <img src={estrelinha} className="estrelinha_btn_favoritar" alt="desfavoritar"/>
                                            <p className="texto_btn_favoritar">Desfavoritar</p>
                                        </button>
                                    </div>

                                </div>
                            )//return foreach
                        })}
                    </div>
                </main>
                <Rodape />
            </div>
        )
    }


}
