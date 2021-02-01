import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import db from '../db.json';
import explicaResp from '../explicaResp.json';
import { useRouter } from 'next/router';
import PageDefault from '../src/components/PageDefault';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import Form from '../src/components/Form';

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

function ResultWidget({
  results,
  questionsNumber
}){
  const router = useRouter();
  return(
    <Widget>
      <Widget.Header>
      <h1>{`${router.query.name}, chegamos ao destino...`}</h1>
      </Widget.Header>

      <Widget.Content>
        <p>Você acertou {results.reduce((somatoriaAtual, resultAtual) => {
          const isRight = resultAtual;
          if(isRight){
            return somatoriaAtual + 1;
          }
          return somatoriaAtual + 0;
        })}
        /{questionsNumber} questões</p>
        <ul>
          {results.map((result, resultIndex) => (
            <li key={`result___${resultIndex}`}>
              Questão {resultIndex+1}:{' '}
              {result 
                ?'Acertou' 
                :'Errou'
              }
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuizWidget({
  question,
  questionIndex,
  questionsNumber,
  addResult,
  onSubmit
}){
  const questionId = `question_${questionIndex}`;
  const [selectedAltern, setSelectedAltern] = React.useState(undefined);
  const [isSubmited, setIsSubmited] = React.useState(false);
  const isCorrect = selectedAltern === question.answer;
  const hasSelectedAltern = selectedAltern !== undefined;

  return(
    <Widget>
        <Widget.Header>
          <h3>{`Pergunta ${questionIndex + 1} de ${questionsNumber}`}</h3>
        </Widget.Header>
        
        <Widget.Image src={question.image} />
        
        <Widget.Content>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              setIsSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsSubmited(false);
                setSelectedAltern(undefined);
              }, 1.5* 1000)
            }}
          >
            <h2>{question.title}</h2>
            <p>{question.description}</p>

            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative_${alternativeIndex}`;
              const isSelected = selectedAltern === alternativeIndex;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

              return(
                <Widget.Topic 
                  htmlFor={alternativeId}
                  key={alternativeId}  
                  data_selected={isSelected}
                  data_status={isSubmited && alternativeStatus}
                  onChange={() => setSelectedAltern(alternativeIndex)}
                  inputId={alternativeId}
                  inputName={questionId}
                >
                  {alternative}
                </Widget.Topic>
              );
            })}

            <Button type="submit" disabled={!hasSelectedAltern}>
              Confirmar
            </Button>
            {(isSubmited && isCorrect) && <h4>Você Acertou :D</h4>}
            {(isSubmited && !isCorrect) && <h4>Você Errou :(</h4>}

          </Form>
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
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [results, setResults] = React.useState([]);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const questionsNumber = db.questions.length;

  function addResult(result){
    setResults([
      ...results,
      result
    ]);
  }

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
        <meta property="og:title" content="Universe Quiz - Perguntas" />
      </Head>

      {screenState === screenStates.LOADING && <LoadingWidget />}
      {screenState === screenStates.QUIZ && 
        <QuizWidget 
          question={question} 
          questionIndex={questionIndex}
          questionsNumber={questionsNumber} 
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
        />
      }
      {screenState == screenStates.RESULT && 
        <ResultWidget 
          results={results} 
          questionsNumber={questionsNumber} />}
    </PageDefault>
  );
}
