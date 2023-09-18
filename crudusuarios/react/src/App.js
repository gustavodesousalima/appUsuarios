import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/form";
import Grid from "./components/grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

// Componente de contêiner estilizado
const Container = styled.div`...`;

// Componente de título estilizado
const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  // Função para obter a lista de usuários a partir da API
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    // Chama a função para obter a lista de usuários quando o componente é montado
    getUsers();
  }, [setUsers]);

  return (
    <div className="App">
      <Container>
        <Title>Usuários</Title>
        {/* Componente de formulário com propriedades */}
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        {/* Componente de grade com propriedades */}
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers}/>
      </Container>
      {/* Componente de notificação de toasts */}
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      {/* Estilos globais */}
      <GlobalStyle />
    </div>
  );
}

export default App;
