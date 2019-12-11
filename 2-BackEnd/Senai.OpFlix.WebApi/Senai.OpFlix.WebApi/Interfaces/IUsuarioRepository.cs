using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    interface IUsuarioRepository
    {
        /// <summary>
        /// Busca um usuário de acordo com o email e senha passados
        /// </summary>
        /// <param name="login"></param>
        /// <returns>Usuário buscado</returns>
        Usuarios BuscarPorEmailESenha(LoginViewModel login);

        /// <summary>
        /// Cadastra um novo usuário no banco de dados
        /// </summary>
        /// <param name="usuario">usuário</param>
        void Cadastrar(Usuarios usuario);
        
    }
}
