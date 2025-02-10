import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Sales Invoice
        </Link>
    
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invoice">
                Invoice
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/checkout">
                Checkout
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
