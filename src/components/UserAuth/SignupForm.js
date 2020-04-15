import React, { useState } from "react";
import { WORDPRESS_URL, LOGIN_ENTRY } from "../const";

const SignupForm = () => {
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function fetchSignup(signupData) {
        let url = WORDPRESS_URL+LOGIN_ENTRY;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(signupData),
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

        const signupData = {
            userEmail: userEmail,
            username: username,
            password: password
        }

        fetchSignup(signupData);
    } 

    return (                       
        <form className="auth-form" id="signUp" onSubmit={onSubmit} method="POST">                   
            <div className="auth-form__inputs">
                <input 
                type="email" 
                placeholder="Ваш email" 
                autoComplete="off"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                />
                <input 
                type="text" 
                placeholder="Ваш username" 
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
            <input className="main-btn" type="submit" value="зареєструватись" />
        </form>
    )
}

export default SignupForm;