import React from 'react';
import LogOffimg from "../media/logoff.jpg";
import { Link } from 'react-router-dom';
import { pushMessage, listenForNewData, DelectChat } from './Firebase';
function ChatePage() {
    function insertdata() {
        const container = document.querySelector('.ctp-msgarea');

        var recent_msg = document.querySelector('.ctp-input').value;
        document.querySelector('.ctp-input').value = "";
        if (!container) {
            console.error('Container element not found in the DOM.');
            return;
        }
        pushMessage(recent_msg)
    }

    const processedMessages = new Set();

    function addChild(recent_msgs) {


        const container = document.querySelector('.ctp-msgarea');
        if (!container) {
            console.error('Container element not found.');
            return;
        }

        // Check if the message has already been processed
        if (processedMessages.has(recent_msgs.timestamp)) {
            console.log('Skipping duplicate message:', recent_msgs.timestamp);
            return;
        }

        // Add the message timestamp to the set
        processedMessages.add(recent_msgs.timestamp);

        // Create and append a new message div
        const newChild = document.createElement('div');
        newChild.className = 'ctp-msgdiv';

        const h3 = document.createElement('h3');
        h3.innerText = recent_msgs.user;
        h3.className = 'ctp-username';
        newChild.appendChild(h3);

        var h4 = document.createElement('h5');
        h4.innerText = recent_msgs.message;
        h4.align='left';
        h4.className = 'ctp-msg';
        newChild.appendChild(h4);
        var h4 = document.createElement('p');
        h4.innerText = recent_msgs.now;
        h4.className = 'ctp-tym';
        h4.align='right';
        newChild.appendChild(h4);
        if(recent_msgs.user!='http://192.168.1.8:3000'){
            
        container.appendChild(newChild);

        }
        // Scroll to the bottom
        container.scrollTop = container.scrollHeight;
    }


    function logoff() {
        DelectChat();
    }

    listenForNewData(addChild);

    return (
        <>
            <div className="ctp-msgarea">
                <div onClick={logoff}>
                    <Link to="/StartChat">
                        <img src={LogOffimg} className='cpt_logoff'></img>

                    </Link>
                </div>
            </div>
            <div className='ctp-sendmsgdiv'>
                <input className='ctp-input' placeholder='type a message...' />
                {/* Change onClick={addChild()} to onClick={addChild} */}
                <button onClick={insertdata} className="ctp-sendbtn">send</button>
            </div>
        </>
    );
}

export default ChatePage;
