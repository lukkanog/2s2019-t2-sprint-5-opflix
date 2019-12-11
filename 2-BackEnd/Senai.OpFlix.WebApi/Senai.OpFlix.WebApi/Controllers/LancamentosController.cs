using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;
using Senai.OpFlix.WebApi.ViewModels;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LancamentosController : ControllerBase
    {
        private ILancamentoRepository LancamentoRepository { get; set; }
        private IFavoritoRepository FavoritoRepository { get; set; }



        public LancamentosController()
        {
            LancamentoRepository = new LancamentoRepository();
            FavoritoRepository = new FavoritoRepository();
        }

        //[Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(LancamentoRepository.Listar());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult BuscarPorId(int id)
        {
            return Ok(LancamentoRepository.BuscarPorId(id));
        }

        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPost]
        public IActionResult Cadastrar(Lancamentos lancamento)
        {
            try
            {

                //if (location != null)
                //{
                //    location.TituloLancamento = lancamento.Titulo;
                //    LocalizacaoRepository.Cadastrar(location);
                //}
                LancamentoRepository.Cadastrar(lancamento);
                return Ok(new { Mensagem = "Lançamento cadastrado com sucesso" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }


        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpPut("{id}")]
        public IActionResult Atualizar(Lancamentos lancamento, int id)
        {
            try
            {
                var lancamentoBuscado = LancamentoRepository.BuscarPorId(id);
                if (lancamentoBuscado == null)
                    return NotFound(new { Mensagem = "Lançamento não encontrado."});

                lancamento.IdLancamento = id;
                LancamentoRepository.Atualizar(lancamento);
                return Ok(new { Mensagem = "Lançamento editado com sucesso" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }


        [Authorize(Roles = "ADMINISTRADOR")]
        [HttpDelete("{id}")]
        public IActionResult Excluir(int id)
        {
            try
            {
                var lancamentoBuscado = LancamentoRepository.BuscarPorId(id);
                if (lancamentoBuscado == null)
                    return NotFound(new { Mensagem = "Lançamento não encontrado." });

                FavoritoRepository.ExcluirRegistrosDeLancamento(id);
                LancamentoRepository.ExcluirPorId(id);
                return Ok(new { Mensagem = "Lançamento removido com sucesso" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro:{ex.Message}" });
            }
        }


        [Authorize]
        [HttpGet("filtrar/categoria/{id}")]
        public IActionResult FiltrarPorCategoria(int id)
        {
            try
            {
                return Ok(LancamentoRepository.FiltrarPorCategoria(id));
            } catch(Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro: {ex.Message}"});
            }
        }

        [Authorize]
        [HttpGet("filtrar/plataforma/{id}")]
        public IActionResult FiltrarPorPlataforma(int id)
        {
            try
            {
                return Ok(LancamentoRepository.FiltrarPorPlataforma(id));
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro: {ex.Message}" });
            }
        }


        [Authorize]
        [HttpGet("buscar/{titulo}")]
        public IActionResult BuscarPorTitulo(string titulo)
        {
            try
            {
                return Ok(LancamentoRepository.BuscarPorTitulo(titulo));
            }
            catch (Exception ex)
            {
                return BadRequest(new { Mensagem = $"Ocorreu o seguinte erro: {ex.Message}" });
            }
        }


    }//#############################################################################################################################
}