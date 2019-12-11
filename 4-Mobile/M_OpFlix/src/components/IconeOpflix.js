import React from "react";
import {Image,Text,View} from "react-native"

function IconeHome(){
    return(
        <View>
            <Image source={require("../assets/img/icon-logo.png")} 
            style={
                {
                    width : 50, 
                    height : 50,
                }
            }
            />
            <Text>OpFLix</Text>
        </View>
    )
}
export default IconeHome