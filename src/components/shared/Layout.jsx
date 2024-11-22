import Sidebar from './Sidebar';
import Header from './Header';
import "../../styles/Layout.css"


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