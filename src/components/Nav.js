import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
        <nav className="main-nav">
            <ul>
            <li> <Link to="/lithuania">Lithuania</Link> </li>
            <li> <Link to="/netherlands">Netherlands</Link> </li>
            <li> <Link to="/england">England</Link> </li>
            </ul>
        </nav>
  );
}

export default Nav;
