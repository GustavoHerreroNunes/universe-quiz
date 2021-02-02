import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function OutrasAventuras({ dbExterno }){
    return(
        <div>
            <ThemeProvider theme={dbExterno.theme}>
                <QuizScreen db={dbExterno} />
            </ThemeProvider>
            <pre style={{ color: 'black' }}>
                {JSON.stringify(dbExterno, null, 4)}
            </pre>
        </div>
    );
}

export async function getServerSideProps(context){
    const [project, devName] = context.query.id.split('___');
    const dbExterno = await fetch(`https://${project}.${devName}.vercel.app/api/db`)
        .then((respostaSever) => {
            if(respostaSever.ok){
                return respostaSever.json();
            }
            throw new Error('Falha em pegar os dados');
        })
        .then((respostaObject) => respostaObject)
        .catch((error) => {
            console.error(error);
        });

        console.log('dbExterno', dbExterno);

    return{
        props: {
            dbExterno
        },
    };
}
