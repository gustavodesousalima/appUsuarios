import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Componente de tabela estilizada
const Table = styled.table`...`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`...`;
export const Td = styled.td`...`;

const Grid = ({ users, setUsers, setOnEdit }) => {

  // Função para lidar com a edição de um usuário
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  // Função para lidar com a exclusão de um usuário
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        // Atualiza a lista de usuários após a exclusão
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th onlyWeb>Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="30%">{item.nome}</Td>
            <Td width="30%">{item.email}</Td>
            <Td width="20%" onlyWeb>
              {item.fone}
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
