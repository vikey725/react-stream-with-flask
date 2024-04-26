// Login.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {login} from '../auth';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useAuth } from '../authentication/useAuth';
import NavBar from './Navbar';
import { Navigate } from 'react-router-dom';
import {useAuthContext} from '../authentication/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuthContext()
  console.log("user in store", localStorage.getItem("user", null))
  const user = useState(
    localStorage.getItem("user", null) != "undefined"? JSON.parse(localStorage.getItem("user")): null
  );
  var user_name = null;

  if (user){
    user_name = user.username;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    auth.LogIn({'username': username, 'password': password})
  };
  

  return (
    <div>
      <NavBar user_name={user_name}/>
      <div style={{'marginTop': '150px'}}>
        <Row className=''>
          <Col xs={1} md={2} lg={4}></Col>
          <Col>
              <Card className=''>
                  <Card.Body>
                    <Card.Title style={{'marginBottom': '20px'}}>Login:</Card.Title>
                    <FloatingLabel
                        controlId="username"
                        label="Username"
                        className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Username" name="username" onChange={(e) => setUsername(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="password"
                        label="Password"
                        className="mb-3"
                    >
                      <Form.Control type="password" placeholder="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    </FloatingLabel>
                    <Button variant="outline-primary" onClick={handleLogin}>Login</Button>{'    '}
                    <span> Don't have an account {':  '}
                      <a href="/register">Signup</a>
                    </span>
                  </Card.Body>
              </Card></Col>
          <Col xs={1} md={2} lg={4}></Col>
        </Row>
      </div> 
    </div>  
  );
};

export default Login;
