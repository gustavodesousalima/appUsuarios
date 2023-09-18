// Importa o módulo mysql para criar uma conexão com o banco de dados MySQL
import mysql from 'mysql';

// Cria uma conexão com o banco de dados usando as informações de configuração
export const db = mysql.createConnection({
    host: "localhost",             // Endereço do servidor MySQL
    user: "root",                  // Nome de usuário do banco de dados
    password: "gustavo57397765890", // Senha do banco de dados
    database: "dbusuarios"         // Nome do banco de dados a ser usado
});
