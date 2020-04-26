import React, { useState } from "react";
import { WORDPRESS_URL, CREATE_USER } from "../const";

const SignupForm = ({ parentResCode }) => {
    const [values, setValues] = useState({email: "", username: "", password: ""});    
    const [error, setError] = useState("");

    function handleChange (e) {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })
    }

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
            if (res.code !== 200) {
                setError(res);
            }          
            parentResCode(res.code); 
        });
    }

    function onSubmit(e) {
        e.preventDefault();

        parentResCode(1);

        const signupData = {
            username: values.username,
            email: values.email,
            password: values.password
        }

        fetchSignup(signupData);
    }

    return (                       
        <form className="auth-form" id="signUp" onSubmit={(e) => onSubmit(e)} method="POST">                   
            <div className="auth-form__inputs">
                {error.code === 401 
                || error.code === 406
                || values.email.length === 0
                    ? <span className="auth-form__error">{error.message}</span>
                    : null
                }
                <input 
                type="email" 
                placeholder="Ваш email" 
                autoComplete="off"
                name="email"
                value={values.email}
                onChange={handleChange}
                />
                {error.code === 400 
                || error.code === 405
                || values.username.length === 0
                    ? <span className="auth-form__error">{error.message}</span>
                    : null
                }
                <input 
                type="text" 
                placeholder="Ваш username" 
                autoComplete="off"
                name="username"
                value={values.username}
                onChange={handleChange}
                />
                {error.code === 404 
                || values.password.length === 0
                    ? <span className="auth-form__error">{error.message}</span>
                    : null
                }
                <input 
                type="password" 
                placeholder="Ваш пароль" 
                autoComplete="off" 
                name="password" 
                value={values.password}
                onChange={handleChange}
                />
            </div>                
            <input className="main-btn" type="submit" value="зареєструватись" />
        </form>
    )
}

export default SignupForm;