USE M_Opflix;
GO

INSERT INTO Usuarios (IdTipoUsuario,Nome,Email,Senha,DataCadastro)
	VALUES	 (2,'Erik','erik@email.com','123456',GETDATE())
			,(2,'Cassiana','cassiana@email.com','123456',GETDATE())
			,(1,'Helena','helena@email.com','123456',GETDATE())
			,(1,'Roberto','rob@email.com','3110',GETDATE())
GO

INSERT INTO Plataformas (Nome)
	VALUES   ('Cinema')
			,('Netflix')
			,('Amazon')
GO		

INSERT INTO TiposLancamentos (Nome)
	VALUEs	 ('Filme')
			,('Serie')
			,('Documentario')
GO

INSERT INTO  Categorias (Nome)
	VALUES		 ('Aventura')
				,('Terror')
				,('Comédia')
				,('Ficção')
				,('Drama')
GO

--SELECT * FROM Categorias ORDER BY IdCategoria ASC
--SELECT * FROM TiposLancamentos ORDER BY IdTipoLancamento ASC
--SELECT * FROM Plataformas ORDER BY IdPlataforma ASC


INSERT INTO Lancamentos (IdCategoria,IdTipoLancamento,IdPlataforma,Titulo,Sinopse,Duracao,DataLancamento)
	VALUES	(5,1,1,'Shrek','Tem o ogro e o burro',95,'2003-11-22')
			,(3,2,2,'How I Met Your Mother','Varios amigo la e talz',22,'2004-04-22')
			,(4,2,3,'The boys','Sei la nunca vi',42,'2019-05-22')
GO

INSERT INTO LancamentosFavoritos (IdUsuario,IdLancamento)
	VALUES		 (3,2)
				,(3,3)
				,(4,2)
				,(4,4)
GO

INSERT INTO Lancamentos (IdCategoria,IdTipoLancamento,IdPlataforma,Titulo,Sinopse,Duracao,DataLancamento)
	VALUES	 (4,1,1,'Doutor Estranho 2','Ta mais estranho ainda agora',95,'2021-11-22')
			,(8,1,2,'A pequena suiça','era uma vez uma suiça baixinha',95,'2019-08-19')
GO

/*   ~~~~~~~~~~~~~~~~~~  E  X  T  R  A  S ~~~~~~~~~~~~~~      */

--SELECT * FROM Usuarios
--SELECT * FROM TiposUsuarios

UPDATE Usuarios
	SET IdTipoUsuario = 2
	WHERE IdUsuario = 3;
GO

INSERT INTO Lancamentos (IdCategoria,IdTipoLancamento,IdPlataforma,Titulo,Sinopse, Duracao,DataLancamento)
	VALUES	 (5,2,2,'La Casa de Papel 3 temp','Os cara rouba ouro de um banco e a nairobi morre',42,'2019-07-15')
			,(5,1,1,'O Rei Leão','O tio do leão é mó cusão',95,'2019-07-18')
GO

DELETE Lancamentos
	WHERE Titulo LIKE 'Deuses Americanos'
GO

--SELECT * FROM Lancamentos
--SELECT * FROM Categorias ORDER BY IdCategoria ASC

UPDATE Lancamentos
	SET Titulo = 'La Casa de Papel - 3ª Temporada'
	WHERE IdLancamento = 17
GO

UPDATE Lancamentos
	SET DataLancamento = '1994-07-08'
	WHERE IdLancamento = 18
GO

UPDATE Lancamentos	
	SET IdCategoria = 5
	WHERE IdLancamento = 3
GO


INSERT INTO Usuarios (IdTipoUsuario,Nome,Email,Senha,DataCadastro)
	VALUES	 (1,'Lucas','lucas@email.com','123456',GETDATE())
GO

INSERT INTO Lancamentos (IdCategoria,IdTipoLancamento,IdPlataforma,Titulo,Sinopse,Duracao,DataLancamento)
	VALUES  (4,1,1,'Guardiões da Galáxia','tem um cara normal um ratão uma verde uma azul e um fortão meio laranja',100,'2014-07-14')
			,(4,1,2,'Guardiões da Galáxia','tem um cara normal um ratão uma verde uma azul e um fortão meio laranja',100,'2018-01-22')
GO


