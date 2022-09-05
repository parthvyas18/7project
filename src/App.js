import "./App.css";
import Home from "./components/Home";
import Interaction from "./components/Interaction";
import { Route ,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {

  
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
      
    </>
  );
}

export default App;