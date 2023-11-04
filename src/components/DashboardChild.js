import React from 'react';
import { FaBars, FaUser, FaPlus, FaSearch, FaUserAlt } from 'react-icons/fa';
import Header from './Header';
import { Link } from 'react-router-dom';

const DashboardChild = ({
    getUsername,
    displayEmail,
    displayUsername,
    jobs,
    actionClick,
    deleteJob,
    click
}) => {
    return (
        <>
            <div className='dashboard'>
                <Header
                    getUsername={getUsername}
                    displayUsername={displayUsername}
                    displayEmail={displayEmail}
                />


                <div className='jobs_container'>
                    <div className='jobs_grid'>

                        {jobs.length === 0 ? (<div className='empty_jobs'>
                            <h3>No Job!</h3>
                            <p>You haven't create any job.</p>
                            <Link to={'/hash'}> Create</Link>
                        </div>)
                            : (jobs.map(job => (
                                <div className='job_box' key={job._id}>
                                    <span className='job_detals_area'>
                                        <h2>{job.position}</h2>
                                        <p className={`${job.status.toLowerCase()}`}>{job.status}</p>
                                    </span>
                                    <span className='job_detals_area'>
                                        <h3>{job.company}</h3>

                                    </span>
                                    <span className='job_detals_area'>
                                        <button onClick={() => actionClick(job._id)} className='actions'>Actions</button>
                                        <Link to={`/edit/${job._id}`}><button>Update</button></Link>
                                        <button onClick={() => deleteJob(job._id)} className='delete_btn'>Delete</button>

                                    </span>
                                    {click === job._id && (
                                        <div className='actions'>
                                            <p>Created: {job.createdAt}</p>
                                            <p>Updated last: {job.updatedAt}</p>
                                        </div>
                                    )}

                                </div>
                            )))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default DashboardChild