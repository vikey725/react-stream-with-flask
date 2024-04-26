// Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../authentication/AuthContext';
import NavBar from './Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [lastAIMessage, setLastAIMessage] = useState('');
    const auth = useAuthContext();
    const [user, setUser] = useState(
        localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): null
    );
    const messagesEndRef = useRef(null);

    var user_name = null;
    if (user) {
        user_name = user.username
    }
    // var tmpPromptResponse = '';

    // useEffect(() => {
        
    // }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (messages.length == 0){
            addMessage('Hi, How can i help ypu?', false);
        }
        scrollToBottom();
    }, [messages]);

    const addMessage = (text, isUser) => {
        setMessages([...messages, { text: text, isUser: isUser }]);
    };

    const url = 'http://localhost:5000/bot';
    const handleSubmit = async (e) => {
        var tmpPromptResponse = '';
        e.preventDefault();
        if (input.trim() === '') return;
        // addMessage(input, true);
        var user_input = { text: input, isUser: true }
        setMessages(prevMessage => [...prevMessage, user_input, { text: 'Typing...', isUser: false }])
        console.log(messages)

        try {
            setInput('');
            const response = await fetch(
                url, {
                    method: 'post', 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({'message': user_input.text, 'id': user.id})
                }
            );
            
            // eslint-disable-next-line no-undef
            let decoder = new TextDecoderStream();
            if (!response.body) return;
            const reader = response.body
              .pipeThrough(decoder)
              .getReader();
            
            while (true) {
              var {value, done} = await reader.read();
              
              if (done) {
                break;
              } else {
                tmpPromptResponse += value;
                setMessages(prevMessage => {
                    prevMessage[prevMessage.length - 1] = {
                        text: tmpPromptResponse,
                        isUser: false
                    }
                    return [...prevMessage];
                })
              }
            }

          } catch (error) {
            console.log(error);
          }

        setInput('');
        // setLastAIMessage('')
        // addMessage(tmpPromptResponse, false)
    };

    return (
        <div>
            <NavBar user_name={user_name}/>
            <div className="chat-container">
                <Row className=''>
                    <Col xs={1} md={2} lg={2}></Col>
                    <Col>
                        {
                            messages.map((message, index) => (

                                <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`} align={(message.isUser? 'right' : 'left')}>
                                    <Card className='chat-msg-card' align='left' body>{message.text}</Card>
                                </div>
                            ))
                        }
                        {/* {lastAIMessage !== '' && (<div key={messages.length} className={'message bot'}> {lastAIMessage}</div>)} */}
                        <div ref={messagesEndRef} />
                    </Col>
                    <Col xs={1} md={2} lg={2}></Col>
                </Row>
            </div>
            <div className='chat-input-container'>
                <Row className=''>
                    <Col xs={1} md={2} lg={2}></Col>
                    <Col>
                        <form onSubmit={handleSubmit}>
                            <InputGroup className="mb-3" >
                                <Form.Control
                                placeholder="Enter your query..."
                                aria-label="query"
                                aria-describedby="basic-addon2"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                />
                                <Button variant="outline-secondary" id="button-addon2" type='submit'>
                                    Send
                                </Button>
                            </InputGroup>
                        </form>
                    </Col>
                    <Col xs={1} md={2} lg={2}></Col>
                </Row>
            </div>
           
        </div>
    );
};

export default Chatbot;
