import React from "react";
import locationIcon from "../../assets/img/location-icon.png"

export default function Rodape(){
    return(
        <footer className="container">
            <div className="content">
                <img src={locationIcon} id="location_icon"/>
                <p>Rua dos bobos nº 0</p>
            </div>
            <div></div>
        </footer>
    )
}