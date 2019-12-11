import React,{Component} from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import {Link,Redirect} from "react-router-dom";
import iconeEditar from "../../assets/img/editar-icon.png";
import iconeExcluir from "../../assets/img/excluir-icon.png";

export default class LancamentosAdm extends Component{
    constructor(){
        super();
        this.state = {
            lancamentos : [],
            idLancamento : "",
        }
    }

    componentDidMount(){
        this.atualizarPagina();
    }

    atualizarPagina = () =>{
        let url = "http://192.168.4.16:5000/api/lancamentos";
        console.log("teste");
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({lancamentos : data}))
        .catch(error => console.log(error))
    }

    atualizarLista = (id) =>{
        console.log("teste");
        let lista = this.state.lancamentos;
        lista = lista.filter(element =>{
            return element.idLancamento !== Number(id)
        })
        this.setState({lancamentos : lista});
    }

    formatarData = (element) =>{
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];
    
        return( dia + "/" + mes + "/" + ano);
    }

    excluirLancamento = (id) => {

        let token = localStorage.getItem("usuario-opflix")

        fetch("http://192.168.4.16:5000/api/lancamentos/" + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(this.atualizarLista(id))
            .catch(error => console.log(error));

            // window.location.reload();
    }

    editarLancamento = (id) =>{
        this.setState({idLancamento : id});
    }    
    
    render(){
        if (this.state.idLancamento !== ""){
            return(
                <Redirect to={{pathname : "/adm/lancamentos/editar", state : {idLancamento : this.state.idLancamento}}}/>
            )
        }
        return(
            <div className="LancamentosAdm">
                <header>
                    <Nav/>
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Administrar lançamentos</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Título</th>
                                    <th>Tipo</th>
                                    <th>Categoria</th>
                                    <th>Plataforma</th>
                                    <th>Data de lançamento</th>
                                    <th>Editar</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.lancamentos.map(element =>{
                                    return(
                                        <tr key={element.idLancamento}>
                                            <td>{element.idLancamento}</td>
                                            <td>{element.titulo}</td>
                                            <td>{element.idTipoLancamentoNavigation.nome}</td>
                                            <td>{element.idCategoriaNavigation.nome}</td>
                                            <td>{element.idPlataformaNavigation.nome}</td>
                                            <td>{this.formatarData(element)}</td>
                                            
                                            <td>
                                                <img  onClick={() => this.editarLancamento(element.idLancamento)} id={"update_" + element.idLancamento}  src={iconeEditar} alt="Editar" className="icone_tabela" />
                                            </td>

                                            <td>
                                                <img id={"delete_" + element.idLancamento} onClick={() => this.excluirLancamento(element.idLancamento)} src={iconeExcluir} alt="Excluir" className="icone_tabela" />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                            <Link id="btn_link_cadastrarLancamento" to="/adm/lancamentos/cadastrar" >
                                Cadastrar novo lançamento
                            </Link>
                    </div>
                </main>
                <Rodape />
            </div>
        )
    }
}