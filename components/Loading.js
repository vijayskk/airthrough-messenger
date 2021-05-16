import styled from 'styled-components'
import { Circle } from "better-react-spinkit";




function Loading() {
    return (
    <Alldiv>
        <Loadingdiv>
            <center><Circle color="white" size={60} /></center>
        </Loadingdiv>
    </Alldiv>
    ) 
}

export default Loading

const Loadingdiv = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  
`;

const Alldiv = styled.div`

  
`;