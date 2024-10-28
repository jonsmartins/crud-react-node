import styled from "styled-components"
import { useEffect, useRef } from "react"
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 10px 20px;
  border: 1px solid #bbb;
  border-radius: 5px;
  heigth: 40px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: #fff;
  heigth: 42px;
`;

const Form = ({ getUsers ,onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current
      user.nome.value = onEdit.nome
      user.email.value = onEdit.email
      user.fone.value = onEdit.fone
      user.data_nascimento.value = onEdit.data_nascimento
    }
  }, [onEdit])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = ref.current

    if(
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
      ) {
        return toast.warn("Preencha todos os campos")
      }

    if(onEdit){
      await axios.put(`http://localhost:8800/${onEdit.id}`, {
        nome: user.nome.value,
        email: user.email.value,
        fone: user.fone.value,
        data_nascimento: user.data_nascimento.value
      })
      .then(({data}) => toast.sucess(data))
      .catch(({data}) => toast.error(data))
    } else {
      await axios.post('http://localhost:8800', {
        nome: user.nome.value,
        email: user.email.value,
        fone: user.fone.value,
        data_nascimento: user.data_nascimento.value
      })
     .then(({data}) => toast.success(data))
     .catch(({data}) => toast.error(data))
    }

    getUsers()
    setOnEdit(null)
    user.nome.value = ""
    user.email.value = ""
    user.fone.value = ""
    user.data_nascimento.value = ""

  }

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Fone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nascimento" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  )
}

export default Form