using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    interface ICategoriaRepository
    {
        /// <summary>
        /// Lista todas as categorias cadastradas no banco de dados
        /// </summary>
        /// <returns>Lista de categorias</returns>
        List<Categorias> Listar();

        /// <summary>
        /// Cadastra uma nova categoria no banco de dados
        /// </summary>
        /// <param name="categoria">Categoria</param>
        void Cadastrar(Categorias categoria);

        /// <summary>
        /// Atualiza uma categoria já cadastrada no banco de dados
        /// </summary>-+
        /// <param name="categoria">Categoria</param>
        void Atualizar(Categorias categoria);

        /// <summary>
        /// Busca uma categoria pelo seu id
        /// </summary>
        /// <param name="id">Id da categoria</param>
        /// <returns></returns>
        Categorias BuscarPorId(int id);
    }
}
