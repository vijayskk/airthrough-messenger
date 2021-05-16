import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { Avatar, Button, IconButton } from '@material-ui/core';
import { auth, provider } from '../firebase';


function login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert);
    };
    return ( 
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
            <Logo src="https://image.freepik.com/free-vector/chat-logo-design_93835-108.jpg" />  
            <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login 

const Container = styled.div`
 display: grid;
 place-items:center;
 height:80vh;
`;
const LoginContainer = styled.div`
display : flex;
flex-direction :column;
align-items:center;
padding:100px;
align-items:center;
background-color: white;
border-radius : 10px;
box-shadow: 0px 4px 4px 4px rgba(0,0,0,0.5)
`;
const Logo = styled.img`
height: 200px;
width: 200px;
`;