using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Usuarios
    {
        public int IdUsuario { get; set; }
        public int IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime? DataCadastro { get; set; }
        public DateTime? DataNascimento { get; set; }

        public TiposUsuarios IdTipoUsuarioNavigation { get; set; }
        public List<LancamentosFavoritos> LancamentosFavoritos { get; set; }



    }
}
