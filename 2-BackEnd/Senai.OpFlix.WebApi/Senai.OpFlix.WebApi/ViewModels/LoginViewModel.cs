using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        public string Email { get; set; }
        [StringLength(30, MinimumLength = 6, ErrorMessage = "A senha tem q ter pelo menos 6 caracteres")]
        public string Senha { get; set; }
    }
}
