using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private const string StringConexao = "Data Source=.\\SqlExpress; initial catalog=M_OpFlix; User Id=sa;Pwd=132";


        public void Atualizar(Categorias categoria)
        {
            string query = "UPDATE Categorias SET Nome = @nome WHERE IdCategoria = @id";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(query,con);
                cmd.Parameters.AddWithValue("@nome",categoria.Nome);
                cmd.Parameters.AddWithValue("@id", categoria.IdCategoria);

                cmd.ExecuteNonQuery();
            }
        }

        public Categorias BuscarPorId(int id)
        {
            string query = "SELECT * FROM Categorias WHERE IdCategoria = @id";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();
                SqlDataReader sdr;

                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@id",id);
                    sdr = cmd.ExecuteReader();

                    if (sdr.HasRows)
                    {
                        while (sdr.Read())
                        {
                            var categoria = new Categorias();
                            categoria.IdCategoria = Convert.ToInt32(sdr["IdCategoria"]);
                            categoria.Nome = sdr["Nome"].ToString();
                            return categoria;
                        }
                    }
                }
            }
            return null;
        }

        public void Cadastrar(Categorias categoria)
        {
            string query = "INSERT INTO Categorias (Nome) VALUES (@nome)";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@nome", categoria.Nome);

                cmd.ExecuteNonQuery();
            }
        }


        public List<Categorias> Listar()
        {
            List<Categorias> lista = new List<Categorias>();
            string query = "SELECT * FROM Categorias ORDER BY IdCategoria ASC";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();
                SqlDataReader sdr;

                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    sdr = cmd.ExecuteReader();

                    while (sdr.Read())
                    {
                        var categoria = new Categorias();
                        categoria.IdCategoria = Convert.ToInt32(sdr["IdCategoria"]);
                        categoria.Nome = sdr["Nome"].ToString();

                        lista.Add(categoria);
                    }
                }

            }
            return lista;
        }


    }//#########################################################################################################################
}
