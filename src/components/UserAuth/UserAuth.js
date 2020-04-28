import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { isLoggedIn } from "../utils";
import { Redirect } from "react-router-dom";

const UserAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const [selected, setSelected] = useState(0);
    const [resCode, setResCode] = useState(0);

    function handleShowModalLogin() {
        setIsShown(true);      
        setShowModal(true); 
        setSelected(0);
    }

    function handleShowModalSignup() {
        setIsShown(true);      
        setShowModal(true); 
        setSelected(1);
    }    
    
    function handleCloseModal() {
        setShowModal(false); 
        setTimeout(function(){ setIsShown(false); }, 1000);  
        setResCode(0); 
    }

    function handleLogout() {
        localStorage.removeItem( 'token' );
        window.location.href = '/forknight/';
    };
    
    const tabs = ["вхід", "реєстрація"];

    function handleTabChange(index) {
        setSelected(index);
    }

    const user = localStorage.getItem('username');
    const modalClassName = showModal
        ? resCode === 0
            ? "shown"
            : resCode === 200 || resCode === 1
                ? "" 
                : "failed" 
        : "hidden"

    return (
        <>
        {
        loggedIn || isLoggedIn()
        ? <>
        <div className="auth" id="dashboard"><Link to={`/dashboard/${user}`}>{user}</Link></div>
        <span>|</span>
        <div className="auth" id="logout" onClick={handleLogout}>вихід</div>
        </>
        : <>
        <div className="auth" id="login" onClick={handleShowModalLogin}>вхід</div>
        <span>|</span>
        <div className="auth" id="signup" onClick={handleShowModalSignup}>реєстрація</div>
        </>
        } 
        {
        loggedIn
        ? <Redirect push to={`/dashboard/${user}`} />
        : <>
            {
            isShown ?
            <div className="auth__modal">
                <div className={`auth__wrap ${modalClassName}`}>
                    <div className="auth__close" onClick={handleCloseModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/>
                        </svg>
                    </div>
                    <ul className="forms">
                        {
                        tabs.map((item, index) => {
                            return <li key={index} className={index === selected ? "tab selected" : "tab"} onClick={(e) => handleTabChange(index)}>{item}</li>
                        })
                        }
                    </ul>
                    {
                    selected === 0
                    ? <LoginForm 
                        parentLoggedIn={loggedIn => setLoggedIn(loggedIn)}
                        parentResCode={resCode => setResCode(resCode)} />
                    : <SignupForm parentResCode={resCode => setResCode(resCode)}/>
                    }
                </div>
            </div>      
            : null
            } </>
        }      
        </>
    )
}

export default UserAuth;