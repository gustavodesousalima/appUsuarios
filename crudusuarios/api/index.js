// Importa o módulo Express para criação da aplicação web
import express from 'express';

// Importa o módulo CORS para permitir requisições de diferentes origens
import cors from 'cors';

// Importa as rotas relacionadas aos usuários
import userRoutes from './routes/users.js';

// Cria uma instância da aplicação Express
const app = express();

// Configura a aplicação para analisar JSON nas requisições
app.use(express.json());

// Configura a aplicação para permitir requisições de diferentes origens usando CORS
app.use(cors());

// Configura as rotas relacionadas aos usuários como rota raiz
app.use("/", userRoutes);

// Inicia o servidor da aplicação na porta 8800
app.listen(8800);
