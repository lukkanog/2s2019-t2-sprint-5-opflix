using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.ViewModels
{
    public class FiltroViewModel
    {
        public DateTime Data { get; set; }
        public int IdPlataforma { get; set; }
        public string NomePlataforma { get; set; }
        public int IdCategoria { get; set; }
        public string NomeCategoria { get; set; }

    }
}
