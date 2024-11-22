import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import "../../styles/Layout.css"


function Layout({ children }) {
  return (
    <div className="layout p-0 m-0">
      <Sidebar />
      <div className="main-content p-0 m-0">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;