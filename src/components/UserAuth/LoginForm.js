import React, { useState } from "react";
import { WORDPRESS_URL, LOGIN_ENTRY } from "../const";

const LoginForm = ({ parentLoggedIn, parentResCode }) => {
    const [values, setValues] = useState({username: "", password: ""});
    const [errors, setErrors] = useState({username: "", password: ""});
    
    function handleChange (e) {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })
    }

    function handleError(res) { 
        let errors = {};

        if (res.code === "[jwt_auth] invalid_username" || "[jwt_auth] invalid_email") {
            errors.username = "Невірний @username або email, спробуйте ще";
        }
        if (res.code === "[jwt_auth] incorrect_password") {
            errors.password = "Невірний пароль, спробуйте ще";
        }
        
        setErrors(errors);    
        parentResCode(res.data.status);
        setTimeout(function(){ parentResCode(1); }, 1000);        
    }

    function validateForm(data) {
        let errors = {};

        if (data.username.length === 0) {           
            errors.username = "Потрібно ввести ваш username або email";
        }
        if (data.password.length === 0) {            
            errors.password = "Потрібно ввести пароль";
        }
        return errors;
    }

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
                handleError(res);
            } else {
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', res.user_display_name);    
                parentLoggedIn(true);
            }

        });
    }
    
    function onSubmit(e) {        
        e.preventDefault();
        setErrors({});

        validateForm(values)

        if (Object.keys(validateForm(values)).length === 0) {
            fetchLogin(values);            
        } else {
            setErrors(validateForm(values)); 
            parentResCode(400);
            setTimeout(function(){ parentResCode(1); }, 1000);  
        } 
    } 

    return (                       
        <form className="auth-form" id="login" onSubmit={(e) => onSubmit(e)} >                   
            <div className="auth-form__inputs">
                {errors.username && <span className="auth-form__error">{errors.username}</span>}
                <input 
                type="text" 
                placeholder="Ваш @username або email" 
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
            <input className="main-btn" type="submit" value="увійти" />
        </form>
    )
}

export default LoginForm;