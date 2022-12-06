import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from "../utils/APIRoutes"
function Register() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: undefined,
        password: undefined,
        relation: undefined,
        regno:undefined
    });

    const options = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value
        setInputs({
            ...inputs,
            [`${name}`]: value
        })
    }

    const validate = (e, p, r,regno) => {
        const regNo=/^\d{2}[A-Z]{3}\d{4}/
        const email = /^[a-z]+\.*\w+@[a-zA-Z]+.\w+/
        const password = /\W+\D*/
        if (email.test(e)) {
            if (password.test(p)) {
                if (r != null) {
                    if(regNo.test(regno)){
                        return "success";
                    }
                    else{
                        return "Invalid Registration Number"
                    }
                }
                else {
                    return "Please Select Relation";
                }
            }
            else {
                return "Password must contain special characters"
            }
        }
        else {
            return "Invalid Email ID"
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate(inputs.email, inputs.password, inputs.relation,inputs.regno);
        if (isValid === "success") {
            const data = await axios.post(registerUser, inputs)
            if (data.data.success) {
                localStorage.setItem("quiz-app", JSON.stringify(data.data.details));
                navigate("/quizPage")
            }
            else {
                toast.error(data.data.msg, options)
            }
        }
        else {
            toast.error(isValid, options);
        }
    }

    return (
        <div class="container views p-4 my-4">
            <form class="needs-validation" onSubmit={handleSubmit}>
                <div class="form-group">
                    <input onChange={handleChange} type="text" class="form-control" id="email" placeholder="Enter Email ID" name="email" required />
                </div>
                <br></br>
                <div class="form-group">
                    <input onChange={handleChange} type="text" class="form-control" id="regno" placeholder="Enter Registration Number" name="regno" required />
                </div>
                <br></br>
                <div class="form-group">
                    <input onChange={handleChange} type="password" class="form-control" id="password" placeholder="Enter password" name="password" required />
                </div>
                <br></br>
                <div class="">
                    <div class="row">
                        <div class="col-3">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input onChange={handleChange} type="radio" class="form-check-input" name="relation" value="teacher" />Teacher
                                </label>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input onChange={handleChange} type="radio" class="form-check-input" name="relation" value="student" />Student
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <button type="submit" class="button">Register</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default Register