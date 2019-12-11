using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }


        //[HttpPost]
        //public IActionResult Cadastrar(Usuarios usuario)
        //{
        //    try
        //    {
        //        var usuarioLogado = HttpContext.User;

        //        if (!usuarioLogado.HasClaim(ClaimTypes.Role,"ADMINISTRADOR") || usuarioLogado == null || usuario.IdTipoUsuario < 1 || usuario.IdTipoUsuario > 2)
        //        {
        //            usuario.IdTipoUsuario = 1;
        //        }

        //        UsuarioRepository.Cadastrar(usuario);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro: {ex.Message}"});
        //    }
        //}


        [HttpPost]
        public IActionResult CadastrarComum(Usuarios usuario)
        {
            try
            {
                usuario.IdTipoUsuario = 1;
                UsuarioRepository.Cadastrar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro: {ex.Message}" });
            }
        }



        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPost("cadastraradmin")]
        public IActionResult CadastrarAdm(Usuarios usuario)
        {
            try
            {
                UsuarioRepository.Cadastrar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro: {ex.Message}" });
            }
        }

    }//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
}