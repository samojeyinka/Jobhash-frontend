import React, { useCallback, useEffect, useState } from 'react';
import { create } from '../styles';
import axios from 'axios'
import PopInAlert from '../components/PopInAlert';
import EditChild from '../components/EditChild';
const Create = () => {


    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/');
    const id = pathSegments[pathSegments.length - 1];
    console.log(id);

    const [newCompany, setNewCompany] = useState('');
    const [newPosition, setNewPosition] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [newStatusOptions, setNewStatusOptions] = useState('');
    const [alertText, setAlertText] = useState('');

    const jobApiPIKey = process.env.REACT_APP_JOBHASH_JOBS;

    useEffect(() => {
        const getSingleJob = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from where you store it (e.g., localStorage)
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const { data: { job } } = await axios.get(`${jobApiPIKey}/${id}`, config);
                const { company, position, status } = job;
                console.log(company, position, status);
                setNewCompany(company);
                setNewPosition(position);
                setNewStatus(status);
            } catch (error) {
                console.log(error)
            }
        }

        getSingleJob();
    }, [id]);


    const fetchStatusOptions = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res = await axios.get(`${jobApiPIKey}/status-options`, config);
            setNewStatusOptions(res.data);
        } catch (error) {
            console.log(error);
        }

    }, []);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const { data: { job } } = await axios.patch(`${jobApiPIKey}/${id}`, {
                company: newCompany,
                position: newPosition,
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { company, position, status } = job;

            setNewCompany(company);
            setNewPosition(position);
            setNewStatus(status);

            setAlertText('Job updated successfully');
        } catch (error) {
            console.log(error)
            setAlertText('Oops! unable to Update job');
        }

        setTimeout(() => {
            setAlertText('');
        }, [3000])

    }


    useEffect(() => {
        fetchStatusOptions();

    }, [fetchStatusOptions])



    return (
        <section className='page'>

            <EditChild
                handleFormSubmit={handleFormSubmit}
                newCompany={newCompany}
                setNewCompany={setNewCompany}
                newPosition={newPosition}
                setNewPosition={setNewPosition}
                newStatus={newStatus}
                setNewStatus={setNewStatus}
            />

            {/* Alert */}
            <PopInAlert headnote={'Job!'} message={alertText} show={alertText !== ''} onClose={() => setAlertText('')} />
        </section>
    )
}

export default Create


