import React from "react";
import { Link } from "react-router-dom";
import { DelectChat } from "./Firebase";
function StartChat(){
       
    DelectChat();

    return(
        <>
            <Link to="/ChatPage">
                  <button type="submit" className="btn-warning btn startchat-btn width-50 ">start chat </button>
                </Link>
        </>


    );
}

export default StartChat;