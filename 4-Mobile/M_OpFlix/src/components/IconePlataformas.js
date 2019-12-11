import React from "react";
import {Image} from "react-native"

function IconeAdmin(){
    return(
        <Image source={require("../assets/img/plataformas-icon.png")} 
        style={
            {
                width : 35, 
                height : 35,
                tintColor : "#FFF"
            }
        }
        />
    )
}
export default IconeAdmin