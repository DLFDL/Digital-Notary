import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GiFeather } from 'react-icons/gi';
import { Button } from './Button';
import './Navbar.css';
import { useEthers } from '@usedapp/core';

function Navbar() {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const { activateBrowserWallet, account, deactivate } = useEthers()

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
      }, []);

    window.addEventListener('resize', showButton);

  return (
    <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    Dagital Notary
                    <GiFeather className='navbar-icon' />
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                        Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                        About
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/certifications' className='nav-links' onClick={closeMobileMenu}>
                        Certifications
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact' className='nav-links' onClick={closeMobileMenu}>
                        Contact
                        </Link>
                    </li>

                    <li>
              <Link
                to='/connect'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Connect
              </Link>
            </li>
          </ul>
          {button &&  !account && <Button buttonStyle='btn--outline' onClick={activateBrowserWallet}>Connect</Button>}
          {button &&  account && <Button buttonStyle='btn--outline' onClick={deactivate}>Disconnect</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar