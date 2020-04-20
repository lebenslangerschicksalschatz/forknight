import React, { useState } from "react";
import { WORDPRESS_URL, LOGIN_ENTRY } from "../const";

const LoginForm = ({ parentLoggedIn, parentResCode }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [resCode, setResCode] = useState(0);    

    function fetchLogin(data) {
        let url = WORDPRESS_URL+LOGIN_ENTRY;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.token === undefined){
                setError(res.message);
                parentResCode(res.code);            
                setResCode(res.code);
                return error;
            }

            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user_display_name);
        });
    }
    
    function onSubmit(e) {        
        e.preventDefault();

        parentResCode(1); 
        setResCode(1);

        const loginData = {
            username: username,
            password: password
        }

        fetchLogin(loginData);
        parentLoggedIn(true);
    }    

    return (                       
        <form className="auth-form" id="login" onSubmit={(e) => onSubmit(e)} >                   
            <div className="auth-form__inputs">
                <input 
                type="text" 
                placeholder="Ваш @username або email" 
                autoComplete="off"
                name="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Ваш пароль" 
                autoComplete="off" 
                name="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>                
            <input className="main-btn" type="submit" value="увійти" />
        </form>
    )
}

export default LoginForm;