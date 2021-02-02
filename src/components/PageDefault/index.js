import styled from 'styled-components';
import db from '../../../db.json';
import Background from '../Background';
import Footer from '../Footer';
import GitHubCorner from '../GithubCorner';
import Logo from '../Logo';
import Widget from '../Widget';

const Container = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;

  @media screen and (max-width: 500px){
    margin: auto;
    padding: 15px;
  }

`;

export default function PeageDefault(props) {
  return (
    <Background backgroundImage={props.bg}>
      <Container>
        <Logo />

        {props.children}
        
        <Footer />

      </Container>

      <GitHubCorner projectUrl="https://github.com/GustavoHerreroNunes/universe-quiz"/>
    </Background>
  );
}
