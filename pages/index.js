import styled from 'styled-components'
import db from '../db.json'
import Background from '../src/components/Background'
import Logo from '../src/components/Logo'
import Widget from '../src/components/Widget'
import GithubCorner from '../src/components/GithubCorner'
import Footer from '../src/components/Footer'

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

/*Componente que representa a página*/
export default function Home() {
  return(
    <Background backgroundImage={db.bg}>
      <Container>
        <GithubCorner />

        <Logo />

        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          
          <Widget.Content>
            <p>{db.description}</p>
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
    </Background>
  );
}
