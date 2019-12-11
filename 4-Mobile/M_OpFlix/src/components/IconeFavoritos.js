import React from "react";
import {Image} from "react-native"

function IconeHome(){
    return(
        <Image source={require("../assets/img/estrela.png")} 
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
export default IconeHome