import Sidebar from '../Layout/Sidebar/Sidebar';
import Header from '../Layout/Header/Header';
import './Layout.css'

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export default Layout;