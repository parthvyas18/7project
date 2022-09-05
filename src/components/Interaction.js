import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import "../App.css";

const Interaction = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);
  const w=window.innerWidth*0.7
  const h=window.innerHeight*0.7

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };
  const clear = () => {
    console.log('clearing');
    ctxRef.current.clearRect(0,0,ctxRef.current.canvas.width,ctxRef.current.canvas.height);
  }
  return (
    <div style={{marginTop:'20px',boxSizing:'border-box'}}>
    <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button className="nav-link active " id="DrawTab" data-bs-toggle="tab" data-bs-target="#Draw" type="button" role="tab" aria-controls="Draw" aria-selected="true">Draw</button>
            <button className="nav-link" id="PrescriptionTab" data-bs-toggle="tab" data-bs-target="#Prescription" type="button" role="tab" aria-controls="Prescription" aria-selected="false">Prescription</button>
        </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
    <div className="tab-pane fade show active" id="Draw" role="tabpanel" aria-labelledby="DrawTab" tabindex="0">
      <div className="draw-area">
        <Menu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          setLineOpacity={setLineOpacity}
        />
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={w}
          height={h}
          
        />
       
      </div>
      <button onClick={clear}>Clear</button>
    </div>
    <div className="tab-pane fade" id="Prescription" role="tabpanel" aria-labelledby="PrescriptionTab" tabindex="0" >
      <h1>Hello</h1>
    </div>
    </div>
    </div>
  );
}

export default Interaction;
