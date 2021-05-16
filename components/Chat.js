import { Avatar } from '@material-ui/core';
import styled from 'styled-components'
import getRecipientEmail from '../utils/getRecipientEmail';
import { useRouter } from 'next/router'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Message } from '@material-ui/icons';



function Chat({id,users}) {

    const [user] = useAuthState(auth);
    const recipientemail = getRecipientEmail(users , user)
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==',getRecipientEmail(users,user))
    ) 
    const router = useRouter()
    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    return (
          
           
            <Container onClick={enterChat}> 
                {recipient ?(
                    <UserAvatar src={recipient?.photoURL}/>
                ):(
                    <UserAvatar>{recipientemail[0]}</UserAvatar>
                )}
                
                <p>{recipientemail}</p>
            </Container>

    )
}

export default Chat



const Container =styled.div`
display : flex;
margin-top: 15px;
align-items: center;
cursor : pointer;
padding:15px;
word-break: break-word;
transition: 0.5s;
:hover{
    background-color: rgb(209, 194, 192);
}

`;

const UserAvatar =styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;
