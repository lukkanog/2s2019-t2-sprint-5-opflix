USE M_Opflix;

SELECT * FROM TiposUsuarios;

SELECT * FROM Usuarios;

SELECT * FROM TiposLancamentos;

SELECT * FROM Lancamentos;

SELECT * FROM Categorias;

SELECT * FROM LancamentosFavoritos;

SELECT * FROM Plataformas;

SELECT U.*,T.Nome
	FROM Usuarios U
	INNER JOIN TiposUsuarios T
	ON U.IdTipoUsuario = T.IdTipoUsuario;

/*SELECIONA OS LANCAMENTOS COM OS NOMES DE SUA CATEGORIA, PLATAFORMA E O TIPO DO LANCAMENTO */
SELECT L.IdLancamento,C.Nome,P.Nome,TL.Nome,L.Titulo,L.Sinopse,L.DataLancamento,L.Duracao
	FROM Lancamentos L
	INNER JOIN Categorias C
	ON C.IdCategoria = L.IdCategoria
	INNER JOIN Plataformas P
	ON P.IdPlataforma = L.IdPlataforma
	INNER JOIN TiposLancamentos TL
	ON TL.IdTipoLancamento = L.IdTipoLancamento
	ORDER BY L.IdLancamento ASC

/*SELECIONA OS USUARIOS E SEUS LANCAMENTOS FAVORITOS (SÒ COM CORRESPONDENCIA)*/
SELECT U.Nome,L.Titulo
	FROM Usuarios U
	INNER JOIN LancamentosFavoritos LF
	ON U.IdUsuario = LF.IdUsuario
	INNER JOIN Lancamentos L
	ON LF.IdLancamento = L.IdLancamento

  /* SELECT TODAS AS  CATEGORIAS E SEUS LANÇAMENTOS (MESMO SE N TEM CORRESPONDENCIA) */
SELECT C.*,L.*
	FROM Categorias C
	LEFT JOIN Lancamentos L
	ON C.IdCategoria = L.IdCategoria


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

SELECT COUNT(*) FROM Usuarios

SELECT UPPER(Nome)
	FROM Usuarios

SELECT REVERSE(Nome)
	FROM Usuarios

SELECT REPLACE(Titulo,' ','_')
	FROM Lancamentos

SELECT LOWER(REPLACE(Titulo,' ','_'))
	FROM Lancamentos




/* VIEW VIEW VIEW VIEW VIEW VIEW VIEW VIEW VIEW*/

CREATE VIEW vwUsuarios AS
	SELECT
		 U.IdUsuario
		,U.IdTipoUsuario
		,T.Nome AS TipoUsuario
		,U.Nome
		,U.Email
		,U.DataCadastro
		,U.DataNascimento
	FROM Usuarios U
	INNER JOIN TiposUsuarios T
	ON T.IdTipoUsuario = U.IdTipoUsuario


SELECT * FROM vwUsuarios;

CREATE VIEW vwLogin 
AS
	SELECT
		 U.IdUsuario
		,U.IdTipoUsuario
		,UPPER(T.Nome) AS TipoUsuario
		,U.Nome
		,U.Email
		,U.Senha
		,U.DataCadastro
		,U.DataNascimento
	FROM Usuarios U
	INNER JOIN TiposUsuarios T
	ON T.IdTipoUsuario = U.IdTipoUsuario

SELECT * FROM VwLogin
--SELECT * FROM vwLogin WHERE Email = 'lucas@email.com' AND Senha = '123456'

--DROP VIEW vwLogin


CREATE VIEW vwCategoriasPlataformas 
	AS
		SELECT P.Nome AS Plataforma,C.Nome AS Categoria
			FROM Lancamentos L
			INNER JOIN Plataformas P
			ON L.IdPlataforma = P.IdPlataforma
			INNER JOIN Categorias C
			ON L.IdCategoria = C.IdCategoria


SELECT * FROM vwCategoriasPlataformas;

CREATE VIEW vwLancamentosCompletos
	AS
	SELECT L.IdLancamento,C.Nome AS Categoria,P.Nome AS Plataforma,TL.Nome AS Tipo,L.Titulo,L.Sinopse,L.DataLancamento,L.Duracao
	FROM Lancamentos L
	INNER JOIN Categorias C
	ON C.IdCategoria = L.IdCategoria
	INNER JOIN Plataformas P
	ON P.IdPlataforma = L.IdPlataforma
	INNER JOIN TiposLancamentos TL
	ON TL.IdTipoLancamento = L.IdTipoLancamento

SELECT * FROM vwLancamentosCompletos;




/*PROCEDURE PROCEDURE PROCEDURE PROCEDURE PROCEDURE PROCEDURE*/

CREATE PROCEDURE ProcurarPorEmail @Email VARCHAR(255)
	AS 
	SELECT * FROM vwUsuarios U
	WHERE U.Email LIKE @Email

EXEC ProcurarPorEmail 'helena@email.com'


CREATE PROCEDURE ProcurarPorCategoria @NomeCategoria VARCHAR(255)
	AS
	SELECT C.Nome,L.*
	FROM Lancamentos L
	INNER JOIN Categorias C
	ON L.IdCategoria = C.IdCategoria
	WHERE C.Nome LIKE @NomeCategoria


CREATE PROCEDURE ProcurarPorIdCategoria @Id INT
	AS
	SELECT C.Nome,L.*
	FROM Lancamentos L
	INNER JOIN Categorias C
	ON L.IdCategoria = C.IdCategoria
	WHERE C.IdCategoria = @Id


EXEC ProcurarPorCategoria 'animação'

EXEC ProcurarPorIdCategoria 5


CREATE PROCEDURE VerPrimeiroLancamento @Titulo VARCHAR(255)
		AS
		DECLARE @dataminima DATE
		SET @dataminima = (SELECT MIN(DataLancamento) FROM Lancamentos  WHERE Titulo LIKE @Titulo)

		SELECT * FROM LANCAMENTOS WHERE Titulo LIKE @Titulo AND DataLancamento = @dataminima


EXEC VerPrimeiroLancamento 'Guardiões da Galáxia'




-- FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION FUNCTION -----

CREATE FUNCTION ContarPorCategoria (@IdCategoria INT)
	RETURNS INT
	BEGIN
		DECLARE @quant INT
		SET @quant = (SELECT COUNT(*)
						FROM Lancamentos L
						WHERE IdCategoria = @IdCategoria)
		RETURN @quant
	END

SELECT dbo.ContarPorCategoria(3);



CREATE FUNCTION QuantosDiasFaltam (@TituloLancamento VARCHAR(255))
	RETURNS INT
	BEGIN
		DECLARE @dataTitulo DATE
		SET @dataTitulo = (SELECT DataLancamento
							FROM Lancamentos
							WHERE Titulo = @TituloLancamento)

		RETURN DATEDIFF(DAY,GETDATE(),@dataTitulo)	
	END

SELECT dbo.QuantosDiasFaltam('Doutor estranho 2') AS DiasParaOLancamento