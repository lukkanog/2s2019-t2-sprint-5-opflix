using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    interface IFavoritoRepository
    {
        /// <summary>
        /// Marca um lançamento como favorito do usuário
        /// </summary>
        /// <param name="favorito">Lancamento favorito</param>
        void Favoritar(LancamentosFavoritos favorito);

        /// <summary>
        /// Lista todos os lançamentos marcados como favoritos de determinado usuário, que é passado pelo id do mesmo
        /// </summary>
        /// <param name="idUsuario">Id do usuário</param>
        /// <returns>Lista de lançamentos</returns>
        List<Lancamentos> ListarFavoritos(int idUsuario);

        /// <summary>
        /// Verifica se aquele lançamento já foi marcado como favorito por aquele usuário
        /// </summary>
        /// <param name="favorito">Lançamento favorito </param>
        /// <returns>Verdadeiro ou falso</returns>
        bool FavoritoJaFoiCadastrado(LancamentosFavoritos favorito);

        /// <summary>
        /// Desmarca determinado lançamento como favorito por determinado usuário
        /// </summary>
        /// <param name="favorito">Lançamento favorito já existente</param>
        void Desfavoritar(LancamentosFavoritos favorito);

        /// <summary>
        /// Lista somente os ids dos lançamentos favoritos do usuario.
        /// Serve para comparação de ids
        /// </summary>
        /// <param name="idUsuario"></param>
        /// <returns>Lista de IDs</returns>
        List<LancamentosFavoritos> ListarIdsFavoritos(int idUsuario);

        /// <summary>
        /// Exclui todos os registros de favoritos que contenham o lançamento passado como parâmetro. Serve ser utilizado quando este determinado lançamento for ser excluído, evitando assim conflitos de Foreign Key.
        /// </summary>
        /// <param name="idLancamento">idLancamento</param>
        void ExcluirRegistrosDeLancamento(int idLancamento);
    }
}
