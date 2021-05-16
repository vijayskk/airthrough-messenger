import React, { useRef, useState } from 'react'
import { Avatar, IconButton, Input } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message'
import { InsertEmoticon } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic'
import SendSharpIcon from '@material-ui/icons/SendSharp';
import firebase from "firebase"
import Timeago from 'timeago-react'
import ArrowDownwardTwoToneIcon from '@material-ui/icons/ArrowDownwardTwoTone';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';



function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const router = useRouter();
    const returnChat = () =>{
        router.push(`/`)
    }
    const endOfMessagesRef = useRef(null);
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"));
    const [recipientSnapshot] = useCollection(
        db.collection("users")
        .where("email", "==" ,getRecipientEmail(chat.users,user))
    )
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message =>(
                <Message 
                    key = {message.id}
                    user = {message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),

                    }}
                />
            ))
            
        }else{
            return JSON.parse(messages).map(message =>(
                <Message key={message.id} user={message.user} message={message} />
            ));
            
        }
        
    }

    const scrollToBottom = () =>{
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();

        //Update last seen...
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },{merge: true}
        );  

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient?.lastSeen);
    const recipientEmail = getRecipientEmail(chat.users,user)
    return (
        <Container>
            <Header>
                <Avatardiv>
                    {recipient ? (
                        <Avatar src={recipient.photoURL} />
                    ) :(
                        <Avatar>{recipientEmail[0]}</Avatar>
                    )}
                </Avatardiv>
                <HeaderInformation>
                    <h3>{getRecipientEmail(chat.users,user)}</h3>
                    {recipientSnapshot ?(
                        <p className = "last-seen">last seen: {'  '}
                        {recipient?.lastSeen?.toDate() ? (
                            <Timeago minPeriod="0" datetime={recipient?.lastSeen?.toDate()} />
                        ):"Unavailable"}
                        </p>
                    ):(
                        <p className = "last-seen">Loading...</p>
                    )}
                    
                </HeaderInformation>
                <ButtonArea>
                    <IconButton>
                        <KeyboardBackspaceIcon onClick={returnChat}/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </ButtonArea>
            </Header>
            <MessageContainer>
            
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef}/>
            
            </MessageContainer>
            <InputContainer>
                <Emoji><IconButton onClick={scrollToBottom}><ArrowDownwardTwoToneIcon /></IconButton></Emoji>
                <Minput value={input} onChange={e => setInput(e.target.value)} />
                <IconButton disabled={!input} type="submit" onClick={sendMessage}>
                    <SendSharpIcon />
                </IconButton>
                
            </InputContainer> 
        </Container>
        
    )
    
}

export default ChatScreen

const Container = styled.div``;

const Header = styled.div`
overflow: hidden;
position: fixed; /* Set the navbar to fixed position */
top: 0; /* Position the navbar at the top of the page */
width: 100%; /* Full width */
display : flex;
align-items : center;
border-bottom : 1px solid whitesmoke;
background-color : #f3f6f6;
z-index: 100;
`;

const HeaderInformation = styled.div`
>h3{
    text-transform : uppercase;
    margin-bottom : 5px;
    @media (max-width: 600px) {
    font-size:15px;
}
}
>p{
    padding-top:0px;
    margin-top:0px;
}

`; 

const Avatardiv = styled.div`
padding : 20px
`;

const ButtonArea = styled.div`
margin-left:20px;   
z-index:100;
`;

const MessageContainer = styled.div`
padding : 30px;
background-color: #e5ded8;
min-height:100vh;
padding-bottom:60px;
padding-top:75px;

`;

const EndOfMessage = styled.div``;

const InputContainer = styled.form`
display:flex;
align-items:center;
padding:10px;
position : sticky;
bottom:0;
background-color:white;
z-index: 100;
width:100%;

`;

const Emoji = styled.div`
margin: 5px;
`;

const Minput = styled.input`
float : right;
flex:1;
position:sticky;
background-color:whitesmoke;
border:none;
border-radius : 15px;
padding : 15px;
margin-right:15px;
margin-left:10px;

`;