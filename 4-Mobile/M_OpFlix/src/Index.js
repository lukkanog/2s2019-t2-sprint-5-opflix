import React from "react";
import { Image } from "react-native"
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";

import loginScreen from "./pages/Login";
import mainScreen from "./pages/Main";
import favoritosScreen from "./pages/Favoritos";
import lancamentoScreen from "./pages/Lancamento";
import cadastroScreen from "./pages/Cadastro";

import dashboardScreen from "./pages/administrador/Dashboard";
import categoriasScreen from "./pages/administrador/Categorias";
import plataformasScreen from "./pages/administrador/Plataformas";
import editarScreen from "./pages/administrador/EditarLancamento";
import admLancamentosScreen from "./pages/administrador/AdmLancamentos";
import cadastroLancamentoScreen from "./pages/administrador/CadastroLancamento";
import cadastroUsuarioAdmScreen from "./pages/administrador/CadastroUsuario";

import iconeHome from "./components/IconeHome";
import iconeFavoritos from "./components/IconeFavoritos";
import IconeAdmin from "./components/IconeAdmin";
import iconeCategorias from "./components/IconeCategorias";
import iconePlataformas from "./components/IconePlataformas";
import iconeLancamentos from "./components/IconeLancamentos";
import iconeAdicionar from "./components/IconeAdicionar";
import iconeAdicionarUsuario from "./components/IconeAddUser";

import SplashScreen from "./pages/SplashScreen";

import customDrawer from "./components/CustomDrawer";

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: loginScreen,
            navigationOptions: {
                header: null,
            }
        },
        Cadastro: {
            screen: cadastroScreen,
            navigationOptions: {
                title: "Cadastre-se",
                headerTitleStyle: {
                    color: "#FFF",
                },
                headerStyle: {
                    backgroundColor: "#a60313"
                }
            }
        },
        Splash: {
            screen: SplashScreen,
            navigationOptions: {
                header: null,
            }
        }
    }, {
    initialRouteName: "Splash",
    unmountInactiveRoutes: true,
}
);

//PARA USUARIOS COMUNS
const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: mainScreen,
            navigationOptions: {
                drawerLabel: "Home",
                drawerIcon: iconeHome,
            }

        },
        Favoritos: {
            screen: favoritosScreen,
            navigationOptions: {
                drawerLabel: "Meus favoritos",
                drawerIcon: iconeFavoritos,
            }
        }

    }, {
    initialRouteName: "Home",
    unmountInactiveRoutes : true,
    drawerPosition: "right",
    drawerBackgroundColor: "#a60313",
    drawerType: "slide",
    drawerLockMode: "unlocked",
    contentOptions: {
        activeTintColor: "#F2EB12",
        inactiveTintColor: "#FFF",
        activeBackgroundColor: "#87020F",
        activeLabelStyle: {
            fontSize: 20,
        },
        inactiveLabelStyle: {
            fontSize: 20,
        }
    },
    contentComponent: customDrawer,
}
);


const AdmDrawerNavigator = createDrawerNavigator(
    {
        Dashboard: {
            screen: dashboardScreen,
            navigationOptions: {
                drawerLabel: "Dashboard",
                drawerIcon: IconeAdmin,
            }
        },
        Categorias: {
            screen: categoriasScreen,
            navigationOptions: {
                drawerLabel: "Administrar Categorias",
                drawerIcon: iconeCategorias
            }
        },
        Plataformas: {
            screen: plataformasScreen,
            navigationOptions: {
                drawerLabel: "Administrar Plataformas",
                drawerIcon: iconePlataformas,
            }
        },
        AdmLancamentos: {
            screen: admLancamentosScreen,
            navigationOptions: {
                drawerLabel: "Administrar Lançamentos",
                drawerIcon: iconeLancamentos,
            }
        },
        CadastroLancamento: {
            screen: cadastroLancamentoScreen,
            navigationOptions: {
                drawerLabel: "Cadastrar Lançamento",
                drawerIcon: iconeAdicionar,
            }
        },
        CadastroUsuarioAdm: {
            screen: cadastroUsuarioAdmScreen,
            navigationOptions: {
                drawerLabel: "Cadastrar Usuário",
                drawerIcon: iconeAdicionarUsuario,
            }
        }
    }, {
    initialRouteName: "Dashboard",
    order: ["Dashboard", "CadastroLancamento", "AdmLancamentos", "Categorias", "Plataformas", "CadastroUsuarioAdm"],
    unmountInactiveRoutes : true,
    drawerPosition: "right",
    drawerBackgroundColor: "#a60313",
    drawerType: "slide",
    drawerLockMode: "unlocked",
    drawerWidth: "80%",
    contentOptions: {
        activeTintColor: "#F2EB12",
        inactiveTintColor: "#FFF",
        activeBackgroundColor: "#87020F",
        activeLabelStyle: {
            fontSize: 20,
        },
        inactiveLabelStyle: {
            fontSize: 20,
        }
    },
    contentComponent: customDrawer,
}
)

export default createAppContainer(createSwitchNavigator(
    {
        AuthStack,
        DrawerNavigator,
        AdmDrawerNavigator,
        lancamentoScreen,
        editarScreen,
    }, {
    initialRouteName: "AuthStack",
    // unmountInactiveRoutes : true,
}
));