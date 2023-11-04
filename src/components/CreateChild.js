import React from 'react';
import { FaBuilding, FaCompass, FaBell } from 'react-icons/fa';
import Header from './Header';

const CreateChild = ({
    handleFormSubmit,
    setCompany,
    company,
    position,
    setPosition,
    status,
    setStatus
}) => {
    return (
        <>
            <div className='create'>
                <Header />
                <div className='create__container'>
                    <h2>Create Potential Job</h2>

                    <form className='create__form' onSubmit={handleFormSubmit}>
                        <div className='input__box'>
                            <input
                                type='text'
                                placeholder='Comapny...'
                                name='company'
                                value={company}
                                onChange={e => { setCompany(e.target.value) }}
                                required
                            />
                            <i className='input__icon'>
                                <FaBuilding />
                            </i>
                        </div>

                        <div className='input__box'>
                            <input
                                type='text'
                                placeholder='Position...'
                                name='position'
                                value={position}
                                onChange={e => { setPosition(e.target.value) }}
                                required
                            />
                            <i className='input__icon'>
                                <FaCompass />
                            </i>
                        </div>
                        <div className='input__box'>
                            <select value={status}
                                onChange={e => { setStatus(e.target.value) }}
                            >
                                <option value='select-status'>Status</option>
                                <option value='pending'>Pending</option>
                                <option value='interviewed'>Interviewed</option>
                                <option value='declined'>Declined</option>
                            </select>

                            <i className='input__icon'>
                                <FaBell />
                            </i>
                        </div>

                        <button type='submit' className='add__btn'>Add job</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateChild