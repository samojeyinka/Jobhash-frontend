import React, { useCallback, useEffect, useState } from 'react';
import { create } from '../styles';
import axios from 'axios'
import PopInAlert from '../components/PopInAlert';
import CreateChild from '../components/CreateChild';
const Create = () => {

    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState('');
    const [statusOptions, setStatusOptions] = useState('pending');
    const [alertText, setAlertText] = useState('');

    const jobApiPIKey = process.env.REACT_APP_JOBHASH_JOBS;
    const getJobs = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from where you store it (e.g., localStorage)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(jobApiPIKey, config);

        } catch (error) {
            console.log(error)
        }
    }


    const fetchStatusOptions = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.get(`${jobApiPIKey}/status-options`, config);
            setStatusOptions(res.data);
        } catch (error) {
            console.log(error);
        }

    }, []);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const post = await axios.post(jobApiPIKey, {
                company,
                position,
                status,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCompany('')
            setPosition('');
            setStatus('pending')
            setAlertText('Job added successfully')
            getJobs();
        } catch (error) {
            console.log(error)
            setAlertText('Oops! unable to add job')
        }

        setTimeout(() => {
            setAlertText('');
        }, [3000])

    }


    useEffect(() => {
        fetchStatusOptions();
        getJobs();
    }, [fetchStatusOptions])



    return (
        <section className='page'>

            <CreateChild
                handleFormSubmit={handleFormSubmit}
                company={company}
                setCompany={setCompany}
                position={position}
                setPosition={setPosition}
                status={status}
                setStatus={setStatus}
            />

            {/* Alert */}
            <PopInAlert headnote={'Job!'} message={alertText} show={alertText !== ''} onClose={() => setAlertText('')} />
        </section>
    )
}

export default Create


