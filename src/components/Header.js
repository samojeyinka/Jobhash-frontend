import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLoader } from "react-spinners/";
import { FaBars, FaUser, FaPlus, FaSearch, FaUserAlt } from 'react-icons/fa';
import { header } from '../styles'
const Header = ({ getUsername, displayEmail, displayUsername }) => {

    const [open, setOpen] = useState(false);
    const handleMenu = () => {
        setOpen(!open);
    }

    const goBack = () => {

        window.history.back()
    }


    //LOGOUT

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return (
        <>
            <div>

                <header className='header'>
                    <div className='nav__left'>
                        <Link onClick={goBack}>
                            <span className='logo__flex'>
                                <i className='logo'>
                                    <HashLoader
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                        color='#2a7454'
                                    />
                                </i>
                                <h2 className='logo_text'>jobhash</h2>
                            </span>
                        </Link>
                    </div>
                    <div className='nav__right'>
                        <span className='user-info'>
                            <p className='info_username'>{displayUsername}</p>
                            <p className='info_email'>{displayEmail}</p>
                        </span>
                        <span className='nav_profile_and_menu' onClick={handleMenu}>
                            <i className='menu_icon'><FaBars /></i>
                            <i className='profile_icon'><FaUser /></i>
                        </span>
                    </div>

                    {/* buttom menu */}
                    <div className='phone-menu'>
                        <ul className='phone_menu_links'>
                            <li><Link to={'/'}><i><FaSearch /></i><p>Explore</p></Link></li>
                            <li><Link to={'/hash'}><i><FaPlus /></i><p>Create</p></Link></li>
                            <li><Link onClick={logout}><i><FaUser /></i><p>Log out</p></Link></li>
                        </ul>
                    </div>
                </header>

                <div className='links_container' className={open ? 'links_container active' : 'links_container'}>
                    <ul className='menu_links'>
                        <li><Link to={'/hash'}>Create job</Link></li>
                        <li><Link to={'/'}>All jobs</Link></li>
                        <span className='break-line'></span>
                        <li><Link className='logout' onClick={logout}>Log out</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header