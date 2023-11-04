import React, { useState } from 'react';
import { auth } from '../styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopInAlert from '../components/PopInAlert';
import LoginChild from '../components/LoginChild';


const Login = () => {
  //

  const navigate = useNavigate()

  const [formData, setFormData] = useState({

    email: '',
    password: '',
  });

  const [showPasssword, setShowPasswod] = useState(false);
  const [isValid, setIsValid] = useState(false);
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
      const response = await axios.post(`${authApiPIKey}/login`, formData);
      console.log(response, 'login successful');

      const token = response.data.token;
      localStorage.setItem('token', token);

      const usernameidentifier = response.data.user.username;
      console.log(usernameidentifier)
      navigate(`/@${usernameidentifier}`);

    } catch (error) {

      if (error.response.data.msg === 'please provide email and password') {
        showAlertText('Please provide your email and password!');
        console.log('Please provide your email and password!');
      } else if (error.response.data.msg === 'wrong password') {
        showAlertText('The password you entered is incorrect, please try again');
        console.log('The password you entered is incorrect, please try again');
      } else if (error.response.data.msg === 'no user found') {
        showAlertText('The credentials you provided does\'nt match any account');
        console.log('The credentials you provided does\'nt match any account');
      } else {
        showAlertText('Something went wrong, try again later');
      }
    }


  }
  return (
    <section className='page'>
      <LoginChild
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isValid={isValid}
        showPasssword={showPasssword}
        handlePasswordVisibility={handlePasswordVisibility}


      />

      <PopInAlert headnote={'Sign In Failed'} message={alertText} show={alertText !== ''} onClose={() => setAlertText('')} />
    </section>
  )
}

export default Login