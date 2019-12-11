using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {
        public ILocalizacaoRepository LocalizacaoRepository { get; set; }

        public LocalizacoesController()
        {
            LocalizacaoRepository = new LocalizacaoRepository();
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPost]
        public IActionResult Cadastrar(Localizacoes localizacoes)
        {
            try
            {
                LocalizacaoRepository.Cadastrar(localizacoes);
                return Ok(new { mensagem = "Localização cadastrada com sucesso."});
            }
            catch (Exception e)
            {
                return BadRequest(new { mensagem = e.Message });
            }
        }


        //[Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(LocalizacaoRepository.Listar());
            }
            catch (Exception e)
            {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpDelete("{titulo}")]
        public IActionResult Excluir(string titulo)
        {
            try
            {
                LocalizacaoRepository.Excluir(titulo);
                return Ok(new { mensagem = "Localização excluída com sucesso."});
            }
            catch (Exception e)
            {
                return BadRequest(new { mensagem = e.Message });
            }
        }


    }////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}