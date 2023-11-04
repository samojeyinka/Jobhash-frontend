import React from 'react';
import { HashLoader } from "react-spinners/";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const RegisterChild = ({
    handleChange,
    handleSubmit,
    handlePasswordVisibility,
    isValid,
    showPasssword
}) => {
    return (
        <>
            <main className='auth register'>
                <i className='auth__splash_logo'>
                    <HashLoader
                        size={35}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        color='#fff'
                    />
                </i>
                <h1>Hello! <br /> Join Us Today</h1>

                <form className='auth__form' onSubmit={handleSubmit}>
                    <div className='auth__input_box'>
                        <label>Username</label>
                        <span>
                            <i className='auth__icon'><FaEnvelope /></i>
                            <input type='username'
                                name='username'
                                placeholder='Enter Your Full Name'
                                onChange={handleChange}
                            />
                            <i className='auth__icon'><FaUser /></i>
                        </span>
                    </div>
                    <br /><br />
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
                    <button type='submit' className='auth__btn'>Sign up</button>
                </form>
                <p className='account-condition'>Already have an account? <Link to={'/login'}>Sign in</Link></p>





            </main>
        </>
    )
}

export default RegisterChild