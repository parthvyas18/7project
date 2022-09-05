import React, { useState, useEffect,useRef} from "react";
import "../index.css";
// import Card from "./Card";
const Chat = ({ visible,mediaStrm}) => {
  var [msg, setmsg] = useState(" ");
  var [data, setdata] = useState([]);
  const remoteVideo=useRef(null);
  const takeMsg = (a) => {
    setdata(data.concat(msg));
    setmsg("");
  };
  const ChatData = () => {
    var dat = data.map((ind, val) => {
      return <p key={ind}>{ind}</p>;
    });
    return <div>{dat}</div>;
  };
  useEffect(() => {
    if(visible===false){
      console.log(mediaStrm)
      console.log('Playing video in chat')
      remoteVideo.current.srcObject = mediaStrm;
      remoteVideo.current.play();
    }
  });
  useEffect(() => {
    ChatData();  
    console.log(data);
  }, []);

    return (
      <>
        <div className="h border d-flex flex-column justify-content-between">
        
          <div className=" d-flex justify-content-center align-items-center" style={{height:"40%",width:'100%'}} >
             <video  ref={remoteVideo} style={{width:'100%',display:visible?'none':'block'}}/>
          </div>
          
          <div className="textBox border w pd5" style={{ height: "40%" }}>
            <ChatData />
          </div>
          <div className="ChatBox border w" style={{ height: "10%" }}>
            <input
              className=""
              type="text"
              placeholder="type..."
              value={msg}
              onChange={(e) => {
                setmsg(e.target.value);
              }}
            />
            <button type="" className="btn" onClick={takeMsg}></button>
          </div>
        </div>
      </>
    );

};
export default Chat;
