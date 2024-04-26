import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
import { getStorageValue, useLocalStorage } from '../authentication/useLocalStorage';

export const useAuth = () => {
    
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
      console.log(user)
    }, [user]);

    const LogIn = async (data) => {
        // axios.post('http://localhost:5000/login', data)
        // .then((response) => {
        //     setUser(response.data);
        //     console.log('Got data while Login: ', response.data)
        //     console.log(user);
        //     localStorage.setItem('user', JSON.stringify(response.data));
        //     navigate("/")
        // }, (error) => {
        // console.log(error);
        // });
        console.log(data);
      fetch('http://localhost:5000/login', {
          method: 'post', 
          headers: {
              'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(data)
        }
      ).then((res) => res.json())
      .then((response) =>  {
          console.log('Login details: ', response)
          setUser(response);
          console.log(user);
          localStorage.setItem('user', JSON.stringify(response));
          navigate("/")
        }, (error) => {
          console.log(error);
        });
    };

    const signUp = async (data) => {
      if (data['password'] === data['confirmPassword']) {
        fetch('http://localhost:5000/register', {
          method: 'post', 
          headers: {
              'Content-Type': 'application/json'
          }, 
          body: JSON.stringify(data)
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

    const signOut = () => {
      fetch('http://localhost:5000/logout', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({'id': JSON.parse(localStorage.getItem("user")).id})
      })
      .then((res) => res.json())
      .then((response) =>  {
        setUser(null);
        localStorage.removeItem('user');
        navigate("/login")
      }, (error) => {
        console.log(error);
      });
       
    };

    return { user, LogIn, signUp, signOut };
};