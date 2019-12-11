using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    interface ILancamentoRepository
    {
        /// <summary>
        /// Cadastra um novo lançamento no banco de dados
        /// </summary>
        /// <param name="lancamento">Lançamento a ser cadastrado</param>
        void Cadastrar(Lancamentos lancamento);

        /// <summary>
        /// Lista todos os lançamentos cadastrados
        /// </summary>
        /// <returns>Uma lista de lançamentos</returns>
        List<Lancamentos> Listar();

        /// <summary>
        /// Atualiza um lançamento já existente
        /// </summary>
        /// <param name="lancamento">Lançamento</param>
        void Atualizar(Lancamentos lancamento);

        /// <summary>
        /// Busca um lançamento pelo seu id e em seguida o exclui.
        /// </summary>
        /// <param name="id">Id do lançamento</param>
        void ExcluirPorId(int id);

        /// <summary>
        /// busca um lançamento pelo seu id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns></returns>
        Lancamentos BuscarPorId(int id);

        /// <summary>
        /// Filtra os lançamentos apenas pela categoria determinada
        /// </summary>
        /// <param name="idCategoria">IdCategoria</param>
        /// <returns>Lista de lançamentos da determinada categoria</returns>
        List<Lancamentos> FiltrarPorCategoria(int idCategoria);

        /// <summary>
        /// Filtra os lançamentos pela plataforma selecionada
        /// </summary>
        /// <param name="idPlataforma"></param>
        /// <returns>Lista de lançamentos da determinada plataforma</returns>
        List<Lancamentos> FiltrarPorPlataforma(int idPlataforma);

        /// <summary>
        /// Busca um lançamento pelo título
        /// </summary>
        /// <param name="titulo"></param>
        /// <returns>Um lançamento encontrado ou nulo caso não seja encontrado</returns>
        List<Lancamentos> BuscarPorTitulo(string titulo);

    }
}
