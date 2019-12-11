using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;
using Senai.OpFlix.WebApi.Domains;
using Microsoft.AspNetCore.Authorization;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private ICategoriaRepository CategoriaRepository { get; set; }

        public CategoriasController()
        {
            CategoriaRepository = new CategoriaRepository();
        }


        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(CategoriaRepository.Listar());
        }



        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPost]
        public IActionResult Cadastrar(Categorias categoria)
        {
            try
            {
                CategoriaRepository.Cadastrar(categoria);
                return Ok(new { Mensagem = "Categoria cadastrada com sucesso" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }


        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(Categorias categoria, int id)
        {
            try
            {
                var categoriaBuscada = CategoriaRepository.BuscarPorId(id);
                if (categoriaBuscada == null)
                    return NotFound(new { Mensagem = $"Categoria não encontrada."});
                categoria.IdCategoria = id;
                CategoriaRepository.Atualizar(categoria);
                return Ok(new { Mensagem = "Categoria editada com sucesso" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }
    }//#######################################################################################################################
}