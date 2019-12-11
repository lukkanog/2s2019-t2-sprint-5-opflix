using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Repositories;
using Senai.OpFlix.WebApi.Interfaces;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class FavoritosController : ControllerBase
    {
        private IFavoritoRepository FavoritoRepository { get; set; }

        public FavoritosController()
        {
            FavoritoRepository = new FavoritoRepository();
        }

        [Authorize]
        [HttpPost]
        public IActionResult Favoritar(LancamentosFavoritos favorito)
        {
            try
            {
                var usuario = HttpContext.User;
                int idUsuario = int.Parse(usuario.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);

                favorito.IdUsuario = idUsuario;

                if (FavoritoRepository.FavoritoJaFoiCadastrado(favorito) == true)
                {
                    return BadRequest(new { Mensagem = $"Você já escolheu esse lançamento como seu favorito" });

                }
                
                FavoritoRepository.Favoritar(favorito);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }


        [Authorize]
        [HttpGet]
        public IActionResult ListarFavoritos()
        {
            try
            {
                var usuario = HttpContext.User;
                int idUsuario = int.Parse(usuario.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(FavoritoRepository.ListarFavoritos(idUsuario));
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }


        [Authorize]
        [HttpDelete("{idLancamento}")]
        public IActionResult Desfavoritar(int idLancamento)
        {
            try
            {
                LancamentosFavoritos favorito = new LancamentosFavoritos();

                var usuario = HttpContext.User;
                int idUsuario = int.Parse(usuario.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);
                favorito.IdUsuario = idUsuario;
                favorito.IdLancamento = idLancamento;

                if (FavoritoRepository.FavoritoJaFoiCadastrado(favorito) == false)
                {
                    return BadRequest(new { Mensagem = "Esse lançamento não é um favorito seu!"});
                }

                FavoritoRepository.Desfavoritar(favorito);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }

        [Authorize]
        [HttpGet("ids")]
        public IActionResult ListarIdentificacoes()
        {
            try
            {
                var usuario = HttpContext.User;
                int idUsuario = int.Parse(usuario.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(FavoritoRepository.ListarIdsFavoritos(idUsuario));
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }

    }//################################################################################
}