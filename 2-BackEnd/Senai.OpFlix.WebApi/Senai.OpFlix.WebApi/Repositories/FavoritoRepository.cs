using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class FavoritoRepository : IFavoritoRepository
    {
        public void Desfavoritar(LancamentosFavoritos favorito)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lancamentoBuscado = ctx.LancamentosFavoritos.FirstOrDefault(x => x.IdLancamento == favorito.IdLancamento && x.IdUsuario == favorito.IdUsuario);

                if (lancamentoBuscado == null)
                    return;

                ctx.LancamentosFavoritos.Remove(lancamentoBuscado);
                ctx.SaveChanges();
            }
        }

        public void ExcluirRegistrosDeLancamento(int idLancamento)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lista = ctx.LancamentosFavoritos.Where(x => x.IdLancamento == idLancamento).ToList();

                foreach (var item in lista)
                {
                    ctx.LancamentosFavoritos.Remove(item);
                    ctx.SaveChanges();
                }
            }
        }

        public void Favoritar(LancamentosFavoritos favorito)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                ctx.LancamentosFavoritos.Add(favorito);
                ctx.SaveChanges();
            }
        }



        public bool FavoritoJaFoiCadastrado(LancamentosFavoritos favorito)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lancamentoBuscado = ctx.LancamentosFavoritos.FirstOrDefault(x => x.IdLancamento == favorito.IdLancamento && x.IdUsuario == favorito.IdUsuario);

                if (lancamentoBuscado == null)
                {
                    return false;    
                }

                return true;
            }
        }

        public List<Lancamentos> ListarFavoritos(int idUsuario)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                var lista = ctx.LancamentosFavoritos.Include(x => x.Lancamento).Include(y => y.Lancamento.IdTipoLancamentoNavigation).Include(z => z.Lancamento.IdPlataformaNavigation).Include(a => a.Lancamento.IdCategoriaNavigation).Where(x => x.IdUsuario == idUsuario).ToList();

                List<Lancamentos> listaLancamentos = new List<Lancamentos>();

                foreach (var item in lista)
                {
                    item.Lancamento.LancamentosFavoritos = null;
                    listaLancamentos.Add(item.Lancamento);
                }

                return listaLancamentos;
            }
        }

        public List<LancamentosFavoritos> ListarIdsFavoritos(int idUsuario)
        {
            using (OpFlixContext ctx = new OpFlixContext())
            {
                return ctx.LancamentosFavoritos.Where(x => x.IdUsuario == idUsuario).ToList();
            }
        }
    }
}
