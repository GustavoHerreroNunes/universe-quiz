import styled from 'styled-components';
import db from '../../../db.json';
import Background from '../Background';
import Footer from '../Footer';
import GitHubCorner from '../GithubCorner';
import Logo from '../Logo';
import Widget from '../Widget';
import { motion } from 'framer-motion';

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

export default function PageDefault(props) {
  return (
    <Background backgroundImage={props.bg}>
      <Container>
        <Logo />

        {props.children}
        
        <Footer
          as={motion.footer}
          transition={{ delay:1.2, duration:0.5 }}
          variants={{
            hidden: { opacity:0, x:'-100%' },
            visible: { opacity:1, x:'0' }
          }}
          initial="hidden"
          animate="visible"
        />

      </Container>

      <GitHubCorner projectUrl="https://github.com/GustavoHerreroNunes/universe-quiz"/>
    </Background>
  );
}
