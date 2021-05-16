import styled from 'styled-components'
import { Circle } from "better-react-spinkit";

function Loading() {
    return (
   <center style={{ display: "grid" , placeItems:"center", hieght:"100vh" }}>
   <div>
       <img src="https://image.freepik.com/free-vector/chat-logo-design_93835-108.jpg"
       alt=""
       style={{marginBottom: 10 }}
       height={200}
       />
       <Circle color="black" size={60} />
   </div>
   </center>
    ) 
}

export default Loading