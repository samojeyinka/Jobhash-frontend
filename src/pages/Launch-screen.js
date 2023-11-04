// WelcomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from "react-spinners/";
import { launchScreenStyles } from '../styles';

const LaunchScreen = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Set a timeout to redirect after 3 seconds (3000 milliseconds)
    const timeoutId = setTimeout(() => {
      setRedirect(true);
    }, 2500);

    // Cleanup the timeout if the component unmounts
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (redirect) {
      // Use the `navigate` function to redirect to the desired route
      navigate('/login');
    }
  }, [redirect, navigate]);


  return (
    <section className='page'>
      <main className='splash'>
        <div className='splash__logobox'>
          <i className='splash__logo'>
            <HashLoader
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
              color='#fff'
            />
          </i>

        </div>
      </main>
    </section>
  );
}

export default LaunchScreen;
