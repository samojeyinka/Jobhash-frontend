import React, { useState } from 'react';
import { auth } from '../styles';
import { HashLoader } from "react-spinners/";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck, FaTimes, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopInAlert from '../components/PopInAlert';
import RegisterChild from '../components/RegisterChild';


const Register = () => {



    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [showPasssword, setShowPasswod] = useState(false);
    const [isValid, setIsValid] = useState();
    const [alertText, setAlertText] = useState('');



    const handleChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;

        if (e.target.name === 'email') {
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const isValidEmail = emailPattern.test(inputValue);
            setIsValid(isValidEmail);
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }


    const handlePasswordVisibility = () => {
        setShowPasswod(!showPasssword);
    }

    const showAlertText = (text, timeout = 3000) => {
        setAlertText(text);

        setTimeout(() => {
            setAlertText('')
        }, timeout)
    }


    const authApiPIKey = process.env.REACT_APP_JOBHASH_AUTH;

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(`${authApiPIKey}/register`, formData);

            if (response.status === 201) {
                console.log('Sign up successful!!');

                const token = response.data.token;
                localStorage.setItem('token', token);

                console.log(response.data.user.username);
                const usernameidentifier = response.data.user.username;
                console.log(usernameidentifier)
                navigate(`/@${usernameidentifier}`);

            }

        } catch (error) {

            console.log(error)
            if (error.response.data.msg === 'Provide your username') {
                showAlertText('Please provide your username!');
                console.log('Please provide your name!');
            } else if (error.response.data.msg === 'Provide your email') {
                showAlertText('Please provide your email');
                console.log('Please provide your email');
            } else if (error.response.data.msg === 'Provide your password') {
                showAlertText('Set your personal password');
                console.log('Set your personal password');
            } else if (error.response.data.msg === 'The email you provided is beign used by another user') {
                showAlertText('The email you provided is beign used by another user');
                console.log('The email you provided is beign used by another user');
            }
            else if (error.response.data.msg === 'The username you provided is beign used by another user') {
                showAlertText('The username you provided is beign used by another user');
                console.log('The username you provided is beign used by another user');
            }
            else if (error.response.data.msg === 'Provide your username and Provide your email') {
                showAlertText('Provide your username & email');
                console.log('Provide your username & email');
            } else if (error.response.data.msg === 'Provide your username and Provide your password') {
                showAlertText('Provide your username & password');
                console.log('Provide your username & password');
            }
            //
            else if (error.response.data.msg === 'Provide your email and Provide your password') {
                showAlertText('Provide your email & password');
                console.log('Provide your email & password');
            } else if (error.response.data.msg === 'Provide your username and Provide your email and Provide your password') {
                showAlertText('Provide your username, email & password');
                console.log('Provide your username, email & password');
            } else {
                showAlertText('Something went wrong, try again later');
            }
        }


    }
    return (
        <section className='page'>
            <RegisterChild
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isValid={isValid}
                showPasssword={showPasssword}
                handlePasswordVisibility={handlePasswordVisibility}
            />

            <PopInAlert headnote={'Sign up'} message={alertText} show={alertText !== ''} onClose={() => setAlertText('')} />
        </section>
    )
}

export default Register