import React from "react";
import ChatPage from "./components/ChatPage";

import { BrowserRouter, Routes, Route,Link} from "react-router-dom";
import "./appstyles.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingForm from "./components/LandingForm";
import LogoHedder from "./components/LogoHedder";
import StartChat from "./components/StartChat";
 



function App() {

   
    
    return (

          <div className="fullbdy">
   
   <BrowserRouter>
          
          <LogoHedder></LogoHedder>
                 <Routes>
                     
                     <Route path="/StartChat"  element={ <StartChat />}></Route>
                     <Route path="/"  element={ <LandingForm />}></Route>
                     <Route path="/ChatPage"  element={<ChatPage/>}></Route>
                     
                 </Routes>
            
             </BrowserRouter>
          </div>
        
);}
export default App;