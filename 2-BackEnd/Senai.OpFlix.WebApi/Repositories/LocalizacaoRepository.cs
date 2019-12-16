using MongoDB.Bson;
using MongoDB.Driver;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LocalizacaoRepository : ILocalizacaoRepository
    {
        private readonly IMongoCollection<Localizacoes> _localizacoes;

        public LocalizacaoRepository()
        {
            //conexão: 
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("m_opflix");
            _localizacoes = database.GetCollection<Localizacoes>("locais");
        }

        public void Atualizar(Localizacoes localizacaoASerAtualizada, Localizacoes localizacaoPassada)
        {
            var updateDefinition = Builders<Localizacoes>.Update
                .Set(x => x.Lancamento.Titulo, localizacaoPassada.Lancamento.Titulo)
                .Set(x => x.Lancamento.DataLancamento, localizacaoPassada.Lancamento.DataLancamento)
                .Set(x => x.Latitude, localizacaoPassada.Latitude)
                .Set(x => x.Longitude, localizacaoPassada.Longitude);

            _localizacoes.UpdateOne(x => x.Id == localizacaoASerAtualizada.Id,  updateDefinition);
        }

        public Localizacoes BuscarPorTitulo(string titulo)
        {
            var location = _localizacoes.Find(x => x.Lancamento.Titulo == titulo).ToList().First();
            

            if (location == null)
            {
                return null;
            }
            else
            {
                return location;
            }
        }

        public void Cadastrar(Localizacoes localizacoes)
        {
            _localizacoes.InsertOne(localizacoes);
        }


        public void Excluir(string titulo)
        {
            try
            {
                _localizacoes.FindOneAndDelete(x => x.Lancamento.Titulo == titulo);
            }
            catch (Exception ex)
            {
            }
        }

        public List<Localizacoes> Listar()
        {
            return _localizacoes.Find(x => true).ToList();
        }
    }
}
