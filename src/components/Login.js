import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'
import Home from './Home'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Form = Styled.form `
    font-family: "Lucida Sans Typewriter";
    width:400px;
    position: relative;
    margin: auto;
    margin-top:150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:white;
    border-radius:26px;
    opacity:0.80;
    button{
        margin: 22px;
        border-radius:22px;
        width:100px;
        height:35px;
        font-size:16px;
        color:white;
        background-color:green;
        border: none;
        &:hover {
          background-color: rgb(28, 222, 35);
          cursor:pointer;
          animation-duration: 5s;
          transition: background-color 2.2s;
          transition-duration: 3s;
          transition: 1.5s;
          letter-spacing: 5px;
        }
    }
    input {
      margin:12px; 
      margin-top: 5px;
      width: 300px;
      height: 45px;
      border-radius: 24px; 
      border-style:solid;
      border-widht:1px;
      border-color:green;

      font-family: "Lucida Sans Typewriter";
      font-size: 12px;
      text-indent: 0.5rem;
      background: white;
      &:hover {
          border-color: rgb(170, 251, 9);;
      }
      &:focus{
          outline: none;
      }
    }

    
`;
const Login= () => {
    const [user,setUser] = useState({
        name:'',
        password:'',
        isAuth:false
    });
    let navigate = useNavigate();

    useEffect(() => {
      user.isAuth ? navigate("/home") : navigate("/");
    },[user.isAuth])

    const userNameControl = (e) => {
      setUser({
        ...user,
        name:e.target.value
      })
    }

    const passwordControl = (e) => {
      setUser({
        ...user,
        password:e.target.value
      })
    }

    const formSubmit = (e) => {
      e.preventDefault();
      if (user.name === "admin" && user.password === "admin") {
        setUser({
          ...user,
          isAuth: true,
        });
        localStorage.setItem('user', true);
        toast.success("Giriş yapıldı", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Kullanıcı Adı veya Şifre Hatalı", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  }
    return(
        <>
          {!user.isAuth ? (
          <Form onSubmit={formSubmit}>
            <h3>Kullanıcı Adı</h3>
            <input 
                onChange={userNameControl}
                type="text"
                placeholder="Kullanıcı Adı"/>
            <h3>Şifre</h3>
            <input 
                onChange={passwordControl}
                type="password"
                placeholder="Şifre"/>
            <button >Login</button>
          </Form>
          ) : (
        <>
          <Home isAuth={user.isAuth}/>
        </>
      )}
      
      
        </>
    )
}

export default Login;