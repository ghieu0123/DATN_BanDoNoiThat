import React from 'react';
import Header from '../../component/Header';
import Footer from '../../component/Footer';
import SideBarAdmin from '../../component/SideBarAdmin';

function Admin({ children }) {
  return (
    <React.Fragment>
      <Header />
      <div className="main">
        <SideBarAdmin />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Admin;
