import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth } from '../firebase';
import moment from "moment"


function Message({user , message}) {
    const[loggedUser] = useAuthState(auth);

    const TypeOfMessage = user === loggedUser.email ? Sender : Reciever

    return (
        <Container >
            <TypeOfMessage>{message.message}
            <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT') : '...'}</Timestamp>
            </TypeOfMessage>                
        </Container>
    )
}

export default Message

const Container = styled.div`


`;
const MessageElement = styled.p`
    width: fit-content;
    align-items:center;
    padding:10px;
    border-radius:20px;
    margin:5px;
    min-width:55px;
    padding-bottom:26px;
    position:relative;
    text-align:right;
`;

const Sender = styled(MessageElement)`
    margin-left:auto;
    text-align:center;
    background-color: #dcf8c6;
    border-bottom-right-radius:0px;
`;

const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: center;
    border-bottom-left-radius:0px;
`;

const Timestamp = styled.span`
    color:gray;
    padding:10px;
    font-size:9px;
    position:absolute;
    bottom:0;
    text-align: right;
    right: 0;
`;