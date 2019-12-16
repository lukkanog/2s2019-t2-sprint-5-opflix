using MongoDB.Bson.Serialization.Attributes;
using Senai.OpFlix.WebApi.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Domains
{
    public class Localizacoes
    {

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }
        //id vai ser string por causa do ObjectId que vem do BSON do MongoDb

        [BsonElement("latitude")]
        [BsonRequired]
        public string Latitude { get; set; }

        [BsonElement("longitude")]
        [BsonRequired]
        public string Longitude { get; set; }

        [BsonElement("lancamento")]
        [BsonRequired]
        public LancamentoViewModel Lancamento { get; set; }
    }
}
