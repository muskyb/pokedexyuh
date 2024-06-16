import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ title, isDarkMode, toggleDarkMode }) => {
  return (
    <div className='navbar'>
      <span className='navbar__title'>{title}</span>
      <DarkModeToggle toggled={isDarkMode} onClick={toggleDarkMode} />
    </div>
  );
}

export default Navbar;
