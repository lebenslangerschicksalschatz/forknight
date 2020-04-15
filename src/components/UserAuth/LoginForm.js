import React, { useState } from "react";
import { WORDPRESS_URL, LOGIN_ENTRY } from "../const";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function fetchLogin(loginData) {
        let url = WORDPRESS_URL+LOGIN_ENTRY;
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
                return;
            }

            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user_nicename);
        });
    }
    
    function onSubmit() {

        const loginData = {
            username: username,
            password: password
        }

        fetchLogin(loginData)
    }    

    return (                       
        <form className="auth-form" id="login" onSubmit={onSubmit} method="POST">                   
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