// Importa o módulo db que contém a configuração do banco de dados
import { db } from '../db.js';

// Obtém todos os usuários do banco de dados
export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";
  
    // Executa a consulta SQL e lida com a resposta ou erro
    db.query(q, (err, data) => {
      if (err) return res.json(err);
  
      // Retorna os dados dos usuários como JSON em caso de sucesso
      return res.status(200).json(data);
    });
};

// Adiciona um novo usuário ao banco de dados
export const addUser = (req, res) => {
    const q =
        "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)";

    // Obtém os valores do corpo da solicitação HTTP
    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    // Executa a consulta de inserção e lida com a resposta ou erro
    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        // Retorna uma mensagem de sucesso em caso de inserção bem-sucedida
        return res.status(200).json("Usuário criado com sucesso.");
    });
};

// Atualiza um usuário existente no banco de dados
export const updateUser = (req, res) => {
    const q =
        "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

    // Obtém os valores do corpo da solicitação HTTP e o ID do usuário a ser atualizado
    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    // Adiciona o ID do usuário como último valor no array de valores
    const updatedValues = [...values, req.params.id];

    // Executa a consulta de atualização e lida com a resposta ou erro
    db.query(q, updatedValues, (err) => {
        if (err) return res.json(err);

        // Retorna uma mensagem de sucesso em caso de atualização bem-sucedida
        return res.status(200).json("Usuário atualizado com sucesso.");
    });
};

// Deleta um usuário do banco de dados
export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";

    // Obtém o ID do usuário a ser excluído da solicitação HTTP
    const userId = req.params.id;

    // Executa a consulta de exclusão e lida com a resposta ou erro
    db.query(q, [userId], (err) => {
        if (err) return res.json(err);

        // Retorna uma mensagem de sucesso em caso de exclusão bem-sucedida
        return res.status(200).json("Usuário deletado com sucesso.");
    });
};
