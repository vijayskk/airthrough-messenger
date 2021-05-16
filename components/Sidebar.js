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
                <ChatIcon /> 
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            <IconButton>
                <SettingsIcon /> 
            </IconButton>    
            <IconButton>
                <ExitToAppIcon onClick={() => auth.signOut()} /> 
            </IconButton>    
        </IconContainer>
        </Header>
        <Search>
        <SearchIcon />
        <SearchInput placeholder="Search In Chats " />
        </Search>
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
overflow-y:scroll;
  ::-webkit-scrollbar{
      display:none;
  }

  -ms-overflow-style:none;
  scrollbar-width:none;

`;

const Header = styled.div`

display : flex;
position : sticky;
top: 0;
background-color : white;
z-index: 1;
justify-content : space-between;
align-items : center;
padding : 15px;
height : 80px;
border-bottom : 1px solid whitesmoke;
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
 border-radius : 5px;
`;
const SearchInput = styled.input`
outline-width: 0;
border : none;
flex : 1;
`;

const ButtonArea = styled.div`

`;

const SidebarButton = styled(Button)`

width: 100%;
font-size: 20px;
border : none;

`; 

