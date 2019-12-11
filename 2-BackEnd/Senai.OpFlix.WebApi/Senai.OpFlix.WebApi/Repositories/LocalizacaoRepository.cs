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

        public Localizacoes BuscarPorId(int id)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(Localizacoes localizacoes)
        {
            _localizacoes.InsertOne(localizacoes);
        }


        public void Excluir(string titulo)
        {
           
        }

        public List<Localizacoes> Listar()
        {
            return _localizacoes.Find(x => true).ToList();
        }
    }
}
