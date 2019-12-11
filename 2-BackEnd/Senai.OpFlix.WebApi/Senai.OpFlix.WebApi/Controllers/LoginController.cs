using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;
using Senai.OpFlix.WebApi.ViewModels;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public LoginController()
        {
            UsuarioRepository = new UsuarioRepository();
        }


        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                var usuario = UsuarioRepository.BuscarPorEmailESenha(login);

                if (usuario == null)
                {
                    return NotFound(new { Mensagem = $"Email ou senha incorretos."});
                }


                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, usuario.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role,usuario.IdTipoUsuarioNavigation.Nome.ToUpper()),
                    new Claim("permissao",usuario.IdTipoUsuarioNavigation.Nome.ToUpper()),
                    new Claim("nome",usuario.Nome),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("opflix-chave-autenticacao"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                        issuer: "OpFlix.WebApi",
                        audience: "OpFlix.WebApi",
                        claims: claims,
                        expires: DateTime.Now.AddHours(12),
                        signingCredentials: creds);



                return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }

    }//#########################################################################################################################
}