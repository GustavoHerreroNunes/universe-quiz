import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import PageDefault from '../src/components/PageDefault'
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

const React = require('react');

export const InputText = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 3px;
  padding: 10px;
  color: white;
  background-color: inherit;
`;

/* Componente que representa a página */
export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <PageDefault>
      <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>

          <Widget.Content>
            <p>{db.description}</p>
            <br />
            <form onSubmit={function (event){
              event.preventDefault();
              
              router.push(`/quiz?name=${name}`);

              console.log("Deu certo meu bom (o envio das infos)"); /**/
            }}
            >
              <InputText
              type="text"
              
              placeholder="Insira seu nome"

              onChange= {function(event){
                setName(event.target.value);
              }}
              />
              <br />
              <br />
              <Button type="submit" disabled={name.length === 0}> 
                JOGAR
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Outras Aventuras</h1>

            <p>www.aindanenhuma.com.:)</p>
          </Widget.Content>
        </Widget>
    </PageDefault>
  );
}
