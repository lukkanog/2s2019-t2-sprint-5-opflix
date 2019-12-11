import React, { Component } from 'react';
import Rodape from "../../components/Rodape/Rodape";
import Nav from "../../components/Nav/Nav";
import GoogleMapReact from 'google-map-react';
import PopcornIcon from "../../assets/img/popcorn-icon.png";
import PinIcon from "../../assets/img/pin-icon.png";
import "../../assets/css/Mapa.css"

const Pin = ({ lancamento }) =>
    <div className="pin-marker">
        <img src={PinIcon} alt="" className="pin-icon" />
        <p className="titulo-marker">{lancamento.titulo}</p>
        {/* <p>{lancamento.dataLancamento}</p> */}
    </div>

export default class Mapa extends Component {

    constructor() {
        super();
        this.state = {
            localizacoes: [],
            carregarMapa: false,
        }
    }



    componentDidMount() {
        this.carregarLocalizacoesParaOMapa();
        setTimeout(console.log(this.state.localizacoes), 1000)
    }


    carregarLocalizacoesParaOMapa = () => {
        try {
            var token = localStorage.getItem("usuario-opflix");

            fetch("http://192.168.4.16:5000/api/localizacoes", {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            })
                .then(resposta => resposta.json())
                .then(data => this.setState({ localizacoes: data }))
                .then(this.setState({ carregarMapa: true }))
                .catch(error => console.log(error))


        } catch (error) {
            console.log(error);
        }
    }



    formatarData = (element) => {
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano);
    }

    createMapOptions(maps) {
        // next props are exposed at maps
        // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
        // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
        // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
        // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
        // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
        return {
            zoomControlOptions: {
                position: maps.ControlPosition.TOP_LEFT,
                style: maps.ZoomControlStyle.SMALL
            },
            mapTypeControlOptions: {
                position: maps.ControlPosition.TOP_RIGHT
            },
        };
    }




    render() {
        console.log(this.state.localizacoes)
        return (
            <div className="Mapa">
                <header>
                    < Nav />
                </header>
                <main>
                    <h2> Confira os lançamentos de todo o mundo!</h2>

                    {/*  !!!! ESSE FUNCIONA  !!!  */}
                    <div className="border">

                        <div style={{
                            height: '70vh',
                            width: "100%",
                            borderColor: "#a60313",
                            borderWidth: 10
                        }}>

                            {this.state.carregarMapa == false ? <span /> :
                                <GoogleMapReact
                                    defaultCenter={{ lat: 25.7358492, lng: 42.1957196 }}
                                    defaultZoom={0}
                                    options={this.createMapOptions}
                                >
                                    {this.state.localizacoes.map(item => {
                                        return (
                                            <Pin
                                                key={item.lancamento.titulo}
                                                lat={item.latitude}
                                                lng={item.longitude}
                                                lancamento={item.lancamento}
                                            />
                                        )

                                    })}


                                </GoogleMapReact>

                                // <GoogleMapReact
                                //     defaultCenter={{ lat: 25.7358492, lng: 42.1957196 }}
                                //     defaultZoom={0}
                                // >
                                //     <AnyReactComponent
                                //         lat={59.955413}
                                //         lng={30.337844}
                                //         text="My Marker"
                                //     />
                                // </GoogleMapReact>
                            }
                        </div>
                    </div>

                    <Rodape />
                </main>
            </div>


        )
    }


}