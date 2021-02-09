import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import PageDefault from '../src/components/PageDefault'
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

const React = require('react');

/* Componente que representa a página */
export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <PageDefault bg={db.bg}>
      <Head>
        <meta property="og:title" content="Universe Quiz - Home" />
      </Head>
      <Widget
        as={motion.section}
        transition={{ delay:0.4,  duration:0.5}}
        variants={{
          hidden: { opacity: 0, x:'-100%' },
          visible: { opacity:1, x:'0' }
        }}
        initial="hidden"
        animate="visible"
      >
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

        <Widget
          as={motion.section}
          transition={{ delay:0.8, duration:0.5 }}
          variants={{
            hidden: { opacity:0, x:'-100%' },
            visible: { opacity:1, x:'0' }
          }}
          initial="hidden"
          animate="visible"
        >
          <Widget.Content>
            <h1>Outras Aventuras</h1>

            <ul>
              {name.length != 0 
                ? db.external.map((link) => {
                  const [project, devName] = link
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.')
                  ;
                  return(
                    <li key={link}>
                      <Widget.Topic as={Link} href={`/quiz/${project}___${devName}?name=${name}`} disabled={name.length === 0}>
                        {`${devName}/${project}`}
                      </Widget.Topic>
                    </li>
                  )
                })
                : <Widget.Topic>
                    Insira seu nome para ver novas aventuras
                  </Widget.Topic>
              }
            </ul>
          </Widget.Content>
        </Widget>
    </PageDefault>
  );
}
