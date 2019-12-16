using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TiposUsuarioController : ControllerBase
    {
        private ITipoUsuarioRepository TipoUsuarioRepository { get; set; }

        public TiposUsuarioController()
        {
            TipoUsuarioRepository = new TipoUsuarioRepository();
        }

        [HttpGet]
        [Authorize(Roles="ADMINISTRADOR")]
        public IActionResult Listar()
        {
            return Ok(TipoUsuarioRepository.Listar());
        }
    }
}