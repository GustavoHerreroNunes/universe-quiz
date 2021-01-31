import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import db from '../db.json';
import PageDefault from '../src/components/PageDefault'
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';

const React = require('react');

/* Componente que representa a página */
export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <PageDefault>
      <Head>
        <meta property="og:title" content="Home" />
      </Head>
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
              <Input
              type="text"

              name="userName"
              
              placeholder="Insira seu nome"

              value={name}

              onChange= {function(event){
                setName(event.target.value);
              }}
              />
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
