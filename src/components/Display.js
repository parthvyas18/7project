import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import copy from "copy-to-clipboard";
import Interaction from './Interaction';
// import user from '../images/userImg.png'
const Display = ({visible,remoteVideoRef,currentUserVideoRef,MediaSet,RemoteMediaSet,mediaStrm,usrstrm}) => {

  const [peerId, setPeerId] = useState('');

  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  var remoteVideoRef = useRef(null);
  var currentUserVideoRef=useRef(null);
  //const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [callInit,setCallInit]=useState(false);

  const copyToClipboard = () => {
    copy(peerId);
    alert(`You have copied "${peerId}"`);
 }
 console.log(callInit);
 useEffect(() =>{
    if(visible===false){
      currentUserVideoRef.current.srcObject = mediaStrm;
      currentUserVideoRef.current.play();
    }
 },[]);
  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id)
    });

    peer.on('call', (call) => {
      setCallInit(true)
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true }, (mediaStream) => {

        MediaSet(mediaStream);
        currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
        call.answer(mediaStream)
        
        call.on('stream', function(remoteStream) {
          RemoteMediaSet(remoteStream);
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    })

    peerInstance.current = peer;
  }, [])

  const call = (remotePeerId) => {
    setCallInit(true)
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true }, (mediaStream) => {
      MediaSet(mediaStream);
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();
  
       console.log(mediaStream);
      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream) => {
        RemoteMediaSet(remoteStream);
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
       
      });
    });
  }
  //  if(visible){
  return (
    
    <div className="h d-flex flex-column justify-content-around" >
     
      
      <div className="d-flex justify-content-around " style={{ height: "60%" }}>
        <div  style={{width:"45%",background:'#373738'}}> 
          <div className="h d-flex justify-content-center align-items-center" >
              <div className=" d-flex flex-column align-items-center" style={{ height: "100%",width:"100%"}}>     
             
                  <video style={{width:"100%",height:"100%"}}ref={currentUserVideoRef} />
            
              </div>
              
          </div>
          <div className="d-flex justify-content-around align-items-center " style={{background:'#373738'}} > 
            <button style={{width:'30%'}} onClick={copyToClipboard}>Copy Id</button>
            
          </div>
          {callInit ===false &&
          <div className="d-flex justify-content-around align-items-center " style={{background:'#373738'}} > 
              <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
              <button onClick={() => call(remotePeerIdValue)}>Call</button>
          </div>
          }
        </div>
       

      
        <div style={{width:"45%",background:'#373738',borderRadius:'1.5%',display:callInit?'block':'none'}}>
           <div className="h  d-flex justify-content-center align-items-center" >
              <div className=" d-flex flex-column align-items-center" style={{ height: "100%",width:"100%"}}>     
            
                  <video style={{width:"100%",height:"100%"}} ref={remoteVideoRef} />
            
              </div>
              
          </div>
        </div>
    
      </div>
    </div>
    
     
    
  );
        }
  // }else{
  //   return(
  //     <div></div>
  //   );
  // }
// };

export default Display;
