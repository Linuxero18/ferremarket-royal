import React from 'react';
import { FaMoon, FaBell, FaCog } from 'react-icons/fa';
import "../../styles/Header.css"

function Header() {
    return (
      <header className="header d-flex justify-content-between align-items-center mt-0 shadow">
        <div className="header-left">
          <h1>FerreMarket Royal</h1>
        </div>
        <div className="header-right d-flex align-items-center">
          <button className="icon-button">
            <FaMoon />
          </button>
          <button className="icon-button">
            <FaBell />
          </button>
          <button className="icon-button">
            <FaCog />
          </button>
        </div>
      </header>
    );
  }
  
  export default Header;