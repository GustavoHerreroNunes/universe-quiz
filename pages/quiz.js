import React from 'react';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import PageDefault from '../src/components/PageDefault';

export default function QuizPage() {
  const router = useRouter();

  return (
    <PageDefault>
      <Widget>
        <Widget.Header>
          <h1>Quiz em Construção</h1>
        </Widget.Header>
        <Widget.Content>
          <h3>Olá {router.query.name}!!!</h3>
          <p>O quiz está em contrução, em breve teremos as perguntas<br />Obrigado por acessar :)</p>
        </Widget.Content>

      </Widget>
    </PageDefault>
  );
}
