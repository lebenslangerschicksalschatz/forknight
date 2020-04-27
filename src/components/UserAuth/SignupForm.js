import React, { useState } from "react";
import { WORDPRESS_URL, CREATE_USER } from "../const";

const SignupForm = ({ parentResCode }) => {
    const [values, setValues] = useState({email: "", username: "", password: ""});    
    const [errors, setErrors] = useState({email: "", username: "", password: ""});

    function handleChange (e) {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    function handleError(res) {
        let errors = {};

        if (res.code === 406) {
            errors.email = res.message;
        }
        if (res.code === 405) {
            errors.username = res.message;
        }
        if (res.code === 404) {
            errors.password = res.message;
        }

        setErrors(errors);    
        parentResCode(res.code);
        setTimeout(function(){ parentResCode(1); }, 1000);      
    }

    function validateForm(data) {
        let errors = {};
        
        if (data.email.length === 0) {           
            errors.email = "Потрібно ввести ваш email";
        } 
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Невірно введений email";
        }
        if (data.username.length === 0) {
            errors.username = "Потрібно ввести ваш username";
        }
        if (data.password.length === 0) {            
            errors.password = "Потрібно ввести пароль";
        } 
        if (data.password.length < 5 && data.password.length > 0){
            errors.password =  "Пароль має бути не менше 5 символів";
        }

        return errors        
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
                handleError(res);
            }
        });
    }

    function onSubmit(e) {
        e.preventDefault(); 
        setErrors({});

        validateForm(values)

        if (Object.keys(validateForm(values)).length === 0) {
            fetchSignup(values);            
        } else {
            setErrors(validateForm(values)); 
            parentResCode(400);
            setTimeout(function(){ parentResCode(1); }, 1000);  
        }
    }

    return (                       
        <form className="auth-form" id="signUp" onSubmit={(e) => onSubmit(e)} method="POST">                   
            <div className="auth-form__inputs">
                {errors.email && <span className="auth-form__error">{errors.email}</span>}
                <input 
                type="text" 
                placeholder="Ваш email" 
                autoComplete="off"
                name="email"
                value={values.email}
                onChange={handleChange}
                />
                {errors.username && <span className="auth-form__error">{errors.username}</span>}
                <input 
                type="text" 
                placeholder="Ваш username" 
                autoComplete="off"
                name="username"
                value={values.username}
                onChange={handleChange}
                />
                {errors.password && <span className="auth-form__error">{errors.password}</span>}
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