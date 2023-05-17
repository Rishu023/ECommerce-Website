import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="container-fluid mt-4 ms-0 w-100">
        <div className="row g-8 w-auto p-3">
          <div className="col-md-3 d-none d-md-block">
            <Sidebar />
          </div>
          <div className="col-12 col-md-9 ">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
