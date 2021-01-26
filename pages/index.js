import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import Background from '../src/components/Background';
import Logo from '../src/components/Logo';
import Widget from '../src/components/Widget';
import GithubCorner from '../src/components/GithubCorner';
import Footer from '../src/components/Footer';

const React = require('react');

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;

  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }

`;

/* Componente que representa a página */
export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <Background backgroundImage={db.bg}>
      <Container>
        <Logo />

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
              <input
              type="text"
              
              placeholder="Insira seu nome"

              onChange= {function(event){
                setName(event.target.value);
              }}
              />
              <br />
              <br />
              <button type="submit" disabled={name.length === 0}> 
                Jogar
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Outras Aventuras</h1>

            <p>www.aindanenhuma.com.:)</p>
          </Widget.Content>
        </Widget>

        <Footer />

      </Container>

      <GithubCorner projectUrl="https://github.com/GustavoHerreroNunes/universe-quiz" />
    </Background>
  );
}
