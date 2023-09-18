import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from 'styled-components';

// Componente de formulário estilizado
const FormContainer = styled.form`...`;
const InputArea = styled.div`...`;
const Input = styled.input`...`;
const Label = styled.label``;
const Button = styled.button`...`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  // Efeito de atualização para preencher campos do formulário ao editar um usuário
  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      // Preenche os campos do formulário com os dados do usuário em edição
      user.nome.value = onEdit.nome;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  // Função de manipulação do envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    // Validação de campos em branco
    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      // Envia uma solicitação PUT se estiver editando um usuário existente
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      // Envia uma solicitação POST se estiver adicionando um novo usuário
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    // Limpa os campos do formulário após o envio
    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    // Limpa o estado de edição e recarrega a lista de usuários
    setOnEdit(null);
    getUsers();
  };

  return (
    // Renderiza o formulário com campos de entrada e botão de envio
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
