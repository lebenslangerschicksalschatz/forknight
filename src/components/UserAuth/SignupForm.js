import React, { useState } from "react";
import { WORDPRESS_URL, CREATE_USER } from "../const";

const SignupForm = ({ parentResCode }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [resCode, setResCode] = useState(0);

    function fetchSignup(data) {
        let url = WORDPRESS_URL+CREATE_USER;
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
            parentResCode(res.code);            
            setResCode(res.code);
        });
    }

    function onSubmit(e) {
        e.preventDefault();

        parentResCode(1); 
        setResCode(1);

        const signupData = {
            username: username,
            email: email,
            password: password
        }

        fetchSignup(signupData);
    }

    return (                       
        <form className="auth-form" id="signUp" onSubmit={(e) => onSubmit(e)} method="POST">                   
            <div className="auth-form__inputs">
                <input 
                type="email" 
                placeholder="Ваш email" 
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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