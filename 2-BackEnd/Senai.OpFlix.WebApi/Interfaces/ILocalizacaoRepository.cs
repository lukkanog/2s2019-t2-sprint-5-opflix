using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface ILocalizacaoRepository
    {
        /// <summary>
        /// Cadastra uma nova localização com latitude, longitude, e dados de qual lançamento esta localização está vinculada
        /// </summary>
        /// <param name="localizacoes">Localizaçao</param>
        void Cadastrar(Localizacoes localizacoes);

        /// <summary>
        /// Exclui um registro de localização. Serve para ser chamado quando um lançamento for excluído
        /// </summary>
        /// <param name="id">id da localização</param>
        void Excluir(string titulo);

        /// <summary>
        /// Lista todas as localizações cadastradas
        /// </summary>
        /// <returns>Lista de localizações</returns>
        List<Localizacoes> Listar();

        /// <summary>
        /// Busca uma localização pelo título do lançamento vinculado a ela.
        /// </summary>
        /// <param name="titulo">Título do lançamento do documento</param>
        /// <returns>Localização</returns>
        Localizacoes BuscarPorTitulo(string titulo);

        /// <summary>
        /// Atualiza uma localização e/ou o título de lançamento que a localização está vinculada.
        /// </summary>
        /// <param name="localizacoes">localização a ser editada</param>
        void Atualizar(Localizacoes localizacaoASerAtualizada, Localizacoes localizacaoPassada);

    }
}
