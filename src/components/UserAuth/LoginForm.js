import React, { useState } from "react";
import { WORDPRESS_URL, LOGIN_ENTRY } from "../const";

const LoginForm = ({ parentLoggedIn, parentResCode, parentError }) => {
    const [values, setValues] = useState({username: "", password: ""});
    const [error, setError] = useState(parentError);
    
    function handleChange (e) {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        })
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
                setError(res.code);
                parentResCode(res.data.status);                
                return error;
            }

            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user_display_name);

            parentLoggedIn(true);
        });
    }
    
    function onSubmit(e) {        
        e.preventDefault();

        const loginData = {
            username: values.username,
            password: values.password
        }

        fetchLogin(loginData);

        parentResCode(1); 
    } 

    const errorCode = {
        emptyUsername: "[jwt_auth] empty_username",
        invalidUsername: "[jwt_auth] invalid_username",
        invalidEmail: "[jwt_auth] invalid_email",
        emptyPass: "[jwt_auth] empty_password",
        invalidPass: "[jwt_auth] incorrect_password"
    };
    
    function errorMessage(error) { 
        if (error === errorCode.emptyUsername || error === errorCode.emptyPass) {
            return "Заповніть необхідне поле"
        }
        if (error === errorCode.invalidUsername || error === errorCode.invalidEmail) {
            return "Невірний @username або email, спробуйте ще"
        }
        if (error === errorCode.invalidPass) {
            return "Невірний пароль, спробуйте ще"
        }
        return null;       
    }

    return (                       
        <form className="auth-form" id="login" onSubmit={(e) => onSubmit(e)} >                   
            <div className="auth-form__inputs">
                {error === errorCode.emptyPass 
                || error === errorCode.invalidPass
                    ? null 
                    : <span className="auth-form__error">{errorMessage(error)}</span>
                }
                <input 
                type="text" 
                placeholder="Ваш @username або email" 
                autoComplete="off"
                name="username" 
                value={values.username}
                onChange={handleChange}
                />
                {error === errorCode.emptyUsername 
                || error === errorCode.invalidUsername 
                || error === errorCode.invalidEmail
                    ? null 
                    : <span className="auth-form__error">{errorMessage(error)}</span>
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
            <input className="main-btn" type="submit" value="увійти" />
        </form>
    )
}

export default LoginForm;