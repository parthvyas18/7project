import "../App.css";
import Display from "./Display";
import Chat from "./Chat";
import "../index.css";
import '../styles/Home.css';
import '../styles/Chat.css';
import { Link,NavLink } from "react-router-dom";
import {useEffect, useState,useRef} from 'react';
import Interaction from "./Interaction";
const Home =() => {
 console.log('In Home Component')
  var [visibility,setVisibility]=useState(true);
  
  var [mediaStrm,setMediaStrm]=useState(null);
  var [usrstrm,setUsrstrm]=useState(null);
 
  const IsVisible = () => {
    setVisibility(!visibility);
    console.log(visibility);
  } 
  const MediaSet=(mediaStream) => {
    setUsrstrm(mediaStream)

  };
  const RemoteMediaSet=(remoteStream) => {
    setMediaStrm(remoteStream);
    
  };
  return (
    <>
      <div className="border Box" style={{ height: "100vh"}}>
        <div className="d-flex justify-content-around mt-2">
         
            <div className="pd5" style={{position:'absolute',zIndex:2,right:'24%'}}>
              <button onClick={(e) => {IsVisible()}}>Click</button>
            </div>
            
         
          <div className="pd5" style={{height: "80vh",width:"75%"}}>
            <Display visible={visibility}  MediaSet={MediaSet} RemoteMediaSet={RemoteMediaSet} usrstrm={usrstrm} mediaStrm={mediaStrm}/>
          </div>
         
          <div className="pd5" style={{height: "100vh",width:"75%",position:'absolute',zIndex:1,backgroundColor:'white',display:visibility?'none':'block',left:10}}>
            <Interaction/>
          </div>
            
          
          <div className=" wbc Chat pd5" style={{ height: "95vh",width:"23%"}}>
            <Chat visible={visibility}  mediaStrm={mediaStrm}/>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Home;
