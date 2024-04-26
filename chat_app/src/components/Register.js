// Register.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  var user_name = null;

  const handleRegister = async () => {
    if (formData['password'] === formData['confirmPassword']) {
      fetch('http://localhost:5000/register', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(formData)
      })
      .then((res) => res.json())
      .then((response) =>  {
        console.log(response);
        navigate("/login")
      }, (error) => {
        console.log(error);
      });
    }
  };

  return (
    <div>
      <NavBar user_name={user_name}/>
      <div style={{'marginTop': '100px'}}>
        <Row className=''>
          <Col xs={1} md={2} lg={4}></Col>
          <Col>
              <Card className=''>
                  <Card.Body>
                    <Card.Title style={{'marginBottom': '20px'}}>Sign up:</Card.Title>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3"
                    >
                      <Form.Control type="text" placeholder="Username" name="username"
                      onChange={handleInputChange} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                      <Form.Control type="email" placeholder="Email" name="email" 
                      onChange={handleInputChange} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                    >
                      <Form.Control type="password" placeholder="Password" name="password" 
                      onChange={handleInputChange} />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="Confirm Password"
                        className="mb-3"
                    >
                      <Form.Control type="password" placeholder="Re-enter Password" name="confirmPassword" 
                      onChange={handleInputChange} />
                    </FloatingLabel>
                    <Button variant="outline-primary" onClick={handleRegister}>Sign up</Button>{'    '}
                    <span> Already have an account {':  '}
                      <a href="/login">Login</a>
                    </span>
                  </Card.Body>
              </Card></Col>
          <Col xs={1} md={2} lg={4}></Col>
        </Row>
      </div>
    </div>
  );
};

export default Register;
