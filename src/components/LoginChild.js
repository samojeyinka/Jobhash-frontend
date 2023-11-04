import React from 'react';
import { HashLoader } from "react-spinners/";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const LoginChild = ({
    handleChange,
    handlePasswordVisibility,
    handleSubmit,
    isValid,
    showPasssword
}) => {
    return (
        <>
            <main className='auth'>
                <i className='auth__splash_logo'>
                    <HashLoader
                        size={35}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        color='#fff'
                    />
                </i>
                <h1>Hey there! <br /> Welcome Back</h1>

                <form className='auth__form' onSubmit={handleSubmit}>
                    <div className='auth__input_box'>
                        <label>Email</label>
                        <span>
                            <i className='auth__icon'><FaEnvelope /></i>
                            <input type='email'
                                name='email'
                                placeholder='Enter Your Email'
                                onChange={handleChange}
                            />
                            {isValid ? <i className='auth__icon'><FaCheck /></i> : <i className='auth__icon invalid-icon'><FaTimes /></i>}
                        </span>
                    </div>
                    <br /><br />
                    <div className='auth__input_box'>
                        <label>Password</label>
                        <span>
                            <i className='auth__icon'><FaLock /></i>
                            <input type={showPasssword ? 'text' : 'password'}
                                placeholder='Enter Your Password'
                                name='password'
                                onChange={handleChange}
                            />
                            <i className='auth__icon' onClick={handlePasswordVisibility}>{showPasssword ? <FaEyeSlash /> : <FaEye />}</i>
                        </span>
                    </div>
                    <button type='submit' className='auth__btn'>Log in</button>
                </form>
                <p className='account-condition'>Don't have an account? <Link to={'/register'}>Sign up</Link></p>






            </main>
        </>
    )
}

export default LoginChild