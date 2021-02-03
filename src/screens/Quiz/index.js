import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import explicaResp from '../../../explicaResp.json';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import PageDefault from '../../components/PageDefault';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import Form from '../../components/Form';
import BackLinkArrow from '../../components/BackLinkArrow';

function LoadingWidget() {
  return (
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
        <Widget.Header>
          <BackLinkArrow href="/" />
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
                  as="label"
                  htmlFor={alternativeId}
                  key={alternativeId}  
                  data-selected={isSelected}
                  data-status={isSubmited && alternativeStatus}
                  onChange={() => setSelectedAltern(alternativeIndex)}
                >
                  <input
                    style={{ display: 'none'}}
                    type="radio"
                    id={alternativeId}
                    name={questionId}
                  />
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
  RESULT: 'RESULT'
}

export default function QuizScreen({ db }) {
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
    }, 2.2 * 1000);
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
    <PageDefault bg={db.bg}>
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
