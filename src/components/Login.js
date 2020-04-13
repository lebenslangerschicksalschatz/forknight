import React, { useState } from "react";
import { WORDPRESS_URL, LOGIN_ENTRY } from "../const";
import { Redirect } from "react-router-dom";
import Loader from './Loader';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userNiceName, setUserNiceName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [error, setError] = useState(""); 

    function handleShowModal() {
        setIsShown(true);      
        setShowModal(true); 
    } 

    function handleCloseModal() {
        setShowModal(false); 
        setTimeout(function(){ setIsShown(false); }, 1000);        
    }

    function fetchLogin(loginData) {
        let url = WORDPRESS_URL+LOGIN_ENTRY;
        setLoading(true);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.token === undefined){
                setError(res.message);
                setLoading(false);
                return;
            }

            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user_nicename);

            setLoading(false);
            setUserNiceName(res.user_nicename);
            setUserEmail(res.user_email);
            setLoggedIn(true);            
        });
    }
    
    function onSubmit(e) {
        e.preventDefault();

        const loginData = {
            username: username,
            password: password
        }

        fetchLogin(loginData)
    }

    const user = username ? username : localStorage.getItem('username');

    if (loggedIn || localStorage.getItem('token')) {
        return (
            <Redirect to={`/dashboard/${user}`} noThrow />

        )
    } else {
        return (
            <>
            <div className="login" onClick={handleShowModal}>Login</div>
            {
            isShown ?
            <div className="login__modal">    
                <form className={showModal ? "login-form shown" : "login-form hidden"} onSubmit={(e) => onSubmit(e)} method="POST">
                    <div className="login__close" onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
                        </svg>
                    </div>   
                    <div className="login-form__inputs">
                        <input 
                        type="text" 
                        placeholder="Your @username or email" 
                        autocomplete="off"
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                        type="password" 
                        placeholder="Your password" 
                        autocomplete="off" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>                
                    <input className="main-btn" type="submit" value="login" />
                </form>
            </div>
            : null
            }
            </>
        )
    }
    
}

export default Login;