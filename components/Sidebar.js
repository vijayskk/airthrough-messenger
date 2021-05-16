import { Avatar, Button, IconButton } from '@material-ui/core';
import React, { useState } from 'react'
import styled from 'styled-components'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import * as Emailvalidator from "email-validator";
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore'
import Chat from '../components/Chat'


function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where('users', 'array-contains',user.email);
    const [chatSnapshot] = useCollection(userChatRef);
    const createChat = ()=>{
        const input = prompt('enter the email');

        if(!input) return;
        if(Emailvalidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
            
           db.collection("chats").add({
               users: [user.email,input]
           })  

        }else alert('Oops....!');
    }

    const chatAlreadyExists = (recemail) =>
        !!chatSnapshot?.docs.find(
            (chat)=>
            chat.data().users.find((user)=> user === recemail)?.length > 0
        );
   
    return(
    <Container>
        <Header>
        <UserAvatar src={user.photoURL} />
        <IconContainer>
            <IconButton>
                <ChatIcon style={{ fill: '#f0e3ca' }}/> 
            </IconButton>
            <IconButton>
                <MoreVertIcon style={{ fill: '#f0e3ca' }}/>
            </IconButton>
            <IconButton>
                <SettingsIcon style={{ fill: '#f0e3ca' }}/> 
            </IconButton>    
            <IconButton>
                <ExitToAppIcon onClick={() => auth.signOut()} style={{ fill: '#f0e3ca' }}/> 
            </IconButton>    
        </IconContainer>
        </Header>
        {/* <Search>
        <SearchIcon />
        <SearchInput placeholder="Search In Chats " />
        </Search> */}
        <ButtonArea>
        <SidebarButton onClick={createChat}>+ Start a new Chat</SidebarButton>
        </ButtonArea>
        {/* Chats will Shown here */}
        {chatSnapshot?.docs.map((chat)=>(
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}

    </Container>
    );
}

export default Sidebar

const Container = styled.div`
flex:0.45;
height: 100vh;
width:100%;
max-width: 350px;
min-width:300px;
background-color:black;
overflow-y:scroll;
  ::-webkit-scrollbar{
      display:none;
  }

  -ms-overflow-style:none;
  scrollbar-width:none;
z-index:100;
@media (max-width: 800px) {
    max-width:1000px;
    }
@media (max-width: 1300px) {
    min-width:300px;
}
`;

const Header = styled.div`

display : flex;
position : sticky;
top: 0;
background-color : #1b1a17;
z-index: 1;
justify-content : space-between;
align-items : center;
padding : 15px;
height : 80px;
border-bottom : 1px solid black;
`;

const UserAvatar = styled(Avatar)`
 cursor : pointer;
 transition : 0.5s;
 :hover{
     opacity : 0.5;
 }
`;

const IconContainer = styled.div`
 
`;   

const Search = styled.div` 
 display : flex;
 align-items : center;
 padding: 20px;
 background-color:#ff8303;
`;
const SearchInput = styled.input`
outline-width: 0;
border : none;
flex : 1;
background-color:#ff8303;
color:black;
::placeholder{
    color:black;
}
`;

const ButtonArea = styled.div`
border-top:1px solid black;
background-color:#ff8303;
border : 0px solid;
border-radius: 20px;
`;

const SidebarButton = styled(Button)`

width: 100%;
font-size: 20px;



`; 

