import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { dashboard } from '../styles';
import PopInAlert from '../components/PopInAlert';
import DashboardChild from '../components/DashboardChild';


const Dashboard = () => {

  const [displayUsername, setDisplayUsername] = useState('');
  const [jobs, setJobs] = useState([]);
  const [displayEmail, setDisplayEmail] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [alertText, setAlertText] = useState('');
  const [click, setClick] = useState(false);

  // "company": "Airbgnb",
  // "position": "Fullstack Eng.",
  // "status": "pending",


  const pathname = window.location.pathname;
  const getUsername = pathname.split('@')[1]

  const authApiPIKey = process.env.REACT_APP_JOBHASH_AUTH;

  useEffect(() => {
    const pathname = window.location.pathname; // Get the current pathname
    ; // Split the pathname and get the part after '@'

    // Make an API request with the extracted username
    const getUser = async () => {
      try {
        const user = await axios.get(`${authApiPIKey}/${getUsername}`);
        const res = user.data.user; // Log the user data from the response
        const { username, email } = res;

        setDisplayUsername(username);
        setDisplayEmail(email)
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);


  const jobApiPIKey = process.env.REACT_APP_JOBHASH_JOBS;

  //get jobs

  const showJobs = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from where you store it (e.g., localStorage)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(jobApiPIKey, config);
      console.log(res.data.jobs);

      const jobs = res.data.jobs;
      if (jobs.length === 0) {
        setJobs([]);
      }

      const { company, position, status, _id: id, createdAt, updatedAt } = jobs;
      console.log(company, position, status, id, createdAt, updatedAt);

      setJobs(jobs)
      setCompany(company);
      setPosition(position);
      setStatus(status);
      setCreatedAt(createdAt);
      setUpdatedAt(updatedAt)
    } catch (error) {
      // Handle errors
      console.log(error)
    }
  }

  const deleteJob = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from where you store it (e.g., localStorage)
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`${jobApiPIKey}/${id}`, config)
      setAlertText('Job deleted successfully!')
      window.location.reload();
      showJobs();
    } catch (error) {
      setAlertText('Unable to delete, try again later!');
      console.log(error)

    }

    setTimeout(() => {
      setAlertText('');
    }, 3000)
  }

  useEffect(() => {
    showJobs()
  }, []);

  const actionClick = (jobId) => {
    setClick(click === jobId ? null : jobId);
    showJobs();
  }


  return (
    <section className='page'>
      <DashboardChild
        getUsername={getUsername}
        displayEmail={displayEmail}
        displayUsername={displayUsername}
        jobs={jobs}
        actionClick={actionClick}
        deleteJob={deleteJob}
        click={click}

      />

      <PopInAlert headnote={'Job!'} message={alertText} show={alertText !== ''} onClose={() => setAlertText('')} />
    </section>
  );
};

export default Dashboard;
