// Importa o módulo Express para criação de rotas
import Express from "express";

// Importa os controladores (funções) relacionados às operações do usuário
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

// Cria um objeto de roteador Express
const router = Express.Router();

// Rota para obter todos os usuários (método GET)
router.get("/", getUsers);

// Rota para adicionar um novo usuário (método POST)
router.post("/", addUser);

// Rota para atualizar um usuário existente por ID (método PUT)
router.put("/:id", updateUser);

// Rota para excluir um usuário por ID (método DELETE)
router.delete("/:id", deleteUser);

// Exporta o objeto de roteador para uso em outros lugares da aplicação
export default router;
