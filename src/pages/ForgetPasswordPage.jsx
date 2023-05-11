import React, { Fragment } from 'react'
import { useState } from "react";

import { Link } from 'react-router-dom'

import '../App.css'
import Navbar from '../components/Navbar';

export default function ForgetPasswordPage() {
    const [inputs, setInputs] = useState({});


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
      }
    return (
        <Fragment>

        <div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a new password</h5>
            <form action="/login" onSubmit={handleSubmit}>
                <p>
                    <label id="reset_pass_lbl">Email address</label><br/>
                    <input type="email" name="email" value={inputs.email} 
                            onChange={handleChange} required />
                </p><br/>
                <p>
                    <button id="sub_btn" type="submit">Send password reset email</button>
                </p>
            </form>
            <footer>
                <p><Link to="/register">Create an account</Link>.</p>
            </footer>
        </div>
        </Fragment>
    )
}
