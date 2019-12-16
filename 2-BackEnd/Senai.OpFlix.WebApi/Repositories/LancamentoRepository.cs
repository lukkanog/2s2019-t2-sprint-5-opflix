using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LancamentoRepository : ILancamentoRepository
    {
        private const string StringConexao = "Data Source=.\\SqlExpress; initial catalog=M_OpFlix; User Id=sa;Pwd=132";

        public void Atualizar(Lancamentos lancamento)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lancamentoBuscado = ctx.Lancamentos.Find(lancamento.IdLancamento);
                if (lancamentoBuscado == null)
                    return;

                lancamentoBuscado.IdCategoria = lancamento.IdCategoria;
                lancamentoBuscado.IdPlataforma = lancamento.IdPlataforma;
                lancamentoBuscado.IdTipoLancamento = lancamento.IdTipoLancamento;
                lancamentoBuscado.Titulo = lancamento.Titulo;
                lancamentoBuscado.Sinopse = lancamento.Sinopse;
                lancamentoBuscado.DataLancamento = lancamento.DataLancamento;
                lancamentoBuscado.Duracao = lancamento.Duracao;
                lancamentoBuscado.Sinopse = lancamento.Sinopse;


                ctx.Update(lancamentoBuscado);
                ctx.SaveChanges();
            }
        }

        public Lancamentos BuscarPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lancamento = ctx.Lancamentos.Include(x => x.IdCategoriaNavigation).Include(x => x.IdPlataformaNavigation).Include(x => x.IdTipoLancamentoNavigation).FirstOrDefault(x => x.IdLancamento == id);
                if (lancamento == null)
                    return null;
                return lancamento;
            }
        }

        public List<Lancamentos> BuscarPorTitulo(string titulo)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lista = ctx.Lancamentos.Include(x => x.IdCategoriaNavigation).Include(x => x.IdPlataformaNavigation).Include(x => x.IdTipoLancamentoNavigation).Where(x => EF.Functions.Like(x.Titulo, $"%{titulo}%")).ToList();

                if (lista != null)
                {
                    foreach (var item in lista)
                    {
                        item.IdCategoriaNavigation.Lancamentos = null;
                        item.IdPlataformaNavigation.Lancamentos = null;
                        item.IdTipoLancamentoNavigation.Lancamentos = null;
                    }
                    return lista;
                }

                return null;
            }
        }

        public void Cadastrar(Lancamentos lancamento)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.Lancamentos.Add(lancamento);
                ctx.SaveChanges();
            }
        }


        public void ExcluirPorId(int id)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lancamentoBuscado = ctx.Lancamentos.Find(id);
                if (lancamentoBuscado == null)
                    return;

                ctx.Lancamentos.Remove(lancamentoBuscado);
                ctx.SaveChanges();
            }
        }

        public List<Lancamentos> FiltrarPorCategoria(int idCategoria)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lista =  ctx.Lancamentos.Include(x => x.IdCategoriaNavigation).Include(x => x.IdPlataformaNavigation).Include(x => x.IdTipoLancamentoNavigation).Where(x => x.IdCategoria == idCategoria).ToList();

                foreach (var item in lista)
                {
                    item.IdCategoriaNavigation.Lancamentos = null;
                    item.IdPlataformaNavigation.Lancamentos = null;
                    item.IdTipoLancamentoNavigation.Lancamentos = null;
                }
                return lista;
            }

        }

        public List<Lancamentos> FiltrarPorPlataforma(int idPlataforma)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lista =  ctx.Lancamentos.Include(x => x.IdCategoriaNavigation).Include(x => x.IdPlataformaNavigation).Include(x => x.IdTipoLancamentoNavigation).Where(x => x.IdPlataforma == idPlataforma).ToList();

                foreach (var item in lista)
                {
                    item.IdCategoriaNavigation.Lancamentos = null;
                    item.IdPlataformaNavigation.Lancamentos = null;
                    item.IdTipoLancamentoNavigation.Lancamentos = null;
                }
                return lista;
            }
        }

        public List<Lancamentos> Listar()
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lista = ctx.Lancamentos.Include(x => x.IdCategoriaNavigation).Include(x => x.IdPlataformaNavigation).Include(x => x.IdTipoLancamentoNavigation).OrderByDescending(x => x.IdLancamento).ToList();

                foreach (var item in lista)
                {
                    item.IdCategoriaNavigation.Lancamentos = null;
                    item.IdPlataformaNavigation.Lancamentos = null;
                    item.IdTipoLancamentoNavigation.Lancamentos = null;
                }
                return lista;
            }
        }


    }//#############################################################################################################################
}
