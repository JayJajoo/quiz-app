import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register'
import "../styles/home.css"

function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const [isRegister, setIsRegister] = useState(false);

    const changeView = (comp) => {
        if(comp==="login"){
            setIsLogin(true)
            setIsRegister(false)
        }
        else{
            setIsLogin(false)
            setIsRegister(true);
        }
    }

    return (
        <div class="home">
            <div class="container-fluid p-5">
                <div class="container text-center p-2">
                    <div class="row">
                        <div
                            className={`col-6 buttons-1 ${isLogin ? "selected" : ""}`}  
                            onClick={()=>changeView("login")}>
                            Login
                        </div>
                        <div
                            className={`col-6 buttons-2 ${isRegister ? "selected" : ""}`}
                            class="col-6 buttons-2"
                            onClick={()=>changeView("register")}>
                            Register
                        </div>
                    </div>
                </div>
                <div class="content">
                    {isLogin && <Login></Login>}
                    {isRegister && <Register></Register>}
                </div>
            </div>
        </div>
    )
}

export default Home