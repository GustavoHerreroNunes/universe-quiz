import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import explicaResp from '../explicaResp.json';
import { useRouter } from 'next/router';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import PageDefault from '../src/components/PageDefault';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>

      <Widget.Content>
        Viajando para as perguntas...
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget(){
  return(
    <Widget>
      <Widget.Header>
        Resultados
      </Widget.Header>

      <Widget.Content>
        <h2>Chegamos ao Destino...</h2>
      </Widget.Content>
    </Widget>
  );
}

function QuizWidget({
  question,
  questionIndex,
  questionsNumber,
  onSubmit
}){
  const questionId = `question_${questionIndex}`;
  const [isResp, setIsResp] = React.useState('');

  return(
    <Widget>
        <Widget.Header>
          <h3>{`Pergunta ${questionIndex + 1} de ${questionsNumber}`}</h3>
        </Widget.Header>
        
        <Widget.Image src={question.image} />
        
        <Widget.Content>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            <h2>{question.title}</h2>
            <p>{question.description}</p>

            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative_${alternativeIndex}`;

              return(
                <Widget.Topic as="label" htmlFor={alternativeId}>
                  <input
                    /* style={{display: 'none'}}*/ 
                    type="radio"
                    id={alternativeId}
                    name={questionId}
                    value={alternative}
                  />

                  {alternative}
                </Widget.Topic>
              );
            })}

            <Button >
              Confirmar
            </Button>
          </form>
        </Widget.Content>

      </Widget>
  );
}

const screenStates ={
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'REASULT'
}

export default function QuizPage() {
  const router = useRouter();
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const questionsNumber = db.questions.length;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz(){
    const nextQuestion = questionIndex + 1;
    if(nextQuestion < questionsNumber){
      setCurrentQuestion(nextQuestion);
    }else{
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <PageDefault>
      <Head>
        <meta property="og:title" content="Perguntas" />
      </Head>

      {screenState === screenStates.LOADING && <LoadingWidget />}
      {screenState === screenStates.QUIZ && 
        <QuizWidget 
          question={question} 
          questionIndex={questionIndex}
          questionsNumber={questionsNumber} 
          onSubmit={handleSubmitQuiz}
        />
      }
      {screenState == screenStates.RESULT && <ResultWidget />}
    </PageDefault>
  );
}
