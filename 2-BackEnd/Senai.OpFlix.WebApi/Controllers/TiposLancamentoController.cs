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
    public class TiposLancamentoController : ControllerBase
    {
        private ITipoLancamentoRepository TipoLancamentoRepository { get; set;}

        public TiposLancamentoController()
        {
            TipoLancamentoRepository = new TipoLancamentoRepository();
        }

        [Authorize(Roles="ADMINISTRADOR")]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(TipoLancamentoRepository.Listar());
        }
    }
}