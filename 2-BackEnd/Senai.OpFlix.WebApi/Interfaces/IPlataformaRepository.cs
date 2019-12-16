using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    interface IPlataformaRepository
    {
        /// <summary>
        /// Lista todas as plataformas cadastradas
        /// </summary>
        /// <returns>Lista de plataformas</returns>
        List<Plataformas> Listar();

        /// <summary>
        /// Cadastra uma nova plataforma no banco de dados
        /// </summary>
        /// <param name="plataforma">Plataforma</param>
        void Cadastrar(Plataformas plataforma);

        /// <summary>
        /// Atualiza uma plataforma já existente
        /// </summary>
        /// <param name="plataforma">plataforma</param>
        void Atualizar(Plataformas plataforma);

        /// <summary>
        /// Busca uma plataforma pelo seu id
        /// </summary>
        /// <param name="id">id</param>
        /// <returns>Plataforma</returns>
        Plataformas BuscarPorId(int id);
    }
}
