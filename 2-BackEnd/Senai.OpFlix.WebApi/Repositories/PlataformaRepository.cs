using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class PlataformaRepository : IPlataformaRepository
    {
        private const string StringConexao = "Data Source=.\\SqlExpress; initial catalog=M_OpFlix; User Id=sa;Pwd=132";



        public void Atualizar(Plataformas plataforma)
        {
            string query = "UPDATE Plataformas SET Nome = @nome WHERE IdPlataforma = @id";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@nome", plataforma.Nome);
                cmd.Parameters.AddWithValue("@id", plataforma.IdPlataforma);

                cmd.ExecuteNonQuery();
            }
        }

        public Plataformas BuscarPorId(int id)
        {
            string query = "SELECT * FROM Plataformas WHERE IdPlataforma = @id";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();
                SqlDataReader sdr;

                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    sdr = cmd.ExecuteReader();

                    if (sdr.HasRows)
                    {
                        while (sdr.Read())
                        {
                            var plataforma = new Plataformas();
                            plataforma.IdPlataforma = Convert.ToInt32(sdr["IdPlataforma"]);
                            plataforma.Nome = sdr["Nome"].ToString();
                            return plataforma;
                        }
                    }
                }
            }
            return null;
        }

        public void Cadastrar(Plataformas plataforma)
        {
            string query = "INSERT INTO Plataformas (Nome) VALUES (@nome)" ;

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Nome",plataforma.Nome);
                cmd.ExecuteNonQuery();
                
            }
        }

        public List<Plataformas> Listar()
        {
            List<Plataformas> lista = new List<Plataformas>();
            string query = "SELECT * FROM Plataformas ORDER BY IdPlataforma ASC";

            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                con.Open();
                SqlDataReader sdr;

                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    sdr = cmd.ExecuteReader();

                    while (sdr.Read())
                    {
                        Plataformas plataforma = new Plataformas();
                        plataforma.IdPlataforma = Convert.ToInt32(sdr["IdPlataforma"]);
                        plataforma.Nome = sdr["Nome"].ToString();

                        lista.Add(plataforma);
                    }
                }
            }
            return lista;
        }
    }//####################################################################################################################################
}
