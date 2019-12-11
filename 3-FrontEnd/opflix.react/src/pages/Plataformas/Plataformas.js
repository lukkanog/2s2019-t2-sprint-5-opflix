import React,{Component} from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";

import "../../assets/css/Categorias.css"

export default class Plataformas extends Component{
    constructor(){
        super();
        this.state = {
            plataformas : [],
            nome : "",
        }
    }

    componentDidMount(){
        this.atualizarEstadoPlataformas();
    }

    atualizarEstadoPlataformas(){
        let token = localStorage.getItem("usuario-opflix");

        fetch("http://192.168.4.16:5000/api/plataformas",{
            method: "GET",
            headers:{
                "Authorization" : "Bearer " + token,
            }
        })
        .then(response => response.json())
        .then(data => this.setState({plataformas : data}))
        .catch(error => console.log(error))
    }

    atualizarEstadoNome = (event) =>{
        event.preventDefault();
        this.setState({nome : event.target.value});
    }

    cadastrarPlataforma = (event) =>{
        event.preventDefault();
        let token = localStorage.getItem("usuario-opflix");

       fetch("http://192.168.4.16:5000/api/plataformas",{
            method : "POST",
            body : JSON.stringify({
                nome : this.state.nome
            }),
            headers:{
                "Authorization" : "Bearer " + token,
                "Content-type" : "application/json",
            }
        })
        .then(() => this.atualizarEstadoPlataformas())
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="Plataformas">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Plataformas</h2>
                        <table className="tabela">
                            <thead>
                                <tr className="linha_cabecalho_tabela">
                                    <th>ID</th>
                                    <th>Plataforma</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.plataformas.map(element =>{
                                    return(
                                        <tr>
                                            <td>{element.idPlataforma}</td>
                                            <td>{element.nome}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                            {/* <h3>Cadastrar nova plataforma</h3> */}
                            <form onSubmit={this.cadastrarPlataforma} className="form_categoria-plataforma">
                                <label>
                                    Cadastrar nova plataforma
                                    <br/>
                                    
                                    <input type="text"  onInput={this.atualizarEstadoNome} maxLength="70" minLength="1" placeholder="Insira o nome da plataforma"/>
                                </label>
                                <input type="submit" value="Cadastrar plataforma" className="link"/>
                            </form>
                    </div>
                </main>
                <Rodape/>
            </div>
        )
    }
}