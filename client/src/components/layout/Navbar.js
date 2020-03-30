import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import AuthContext from "./../../context/Auth/AuthContext";
import ContactContext from './../../context/Contact/ContactContext';

const Navbar = ({ title, icon }) => {

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
      logout()
      clearContacts();
    }

  const authLinks = (
    <Fragment>
      <li>Hello {user ? user.name : null}</li>
      <li onClick={onLogout}>
        <a style={{ cursor: 'pointer'}}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register"> Register</Link>
      </li>
      <li>
        <Link to="/login"> Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        { isAuthenticated ? authLinks : guestLinks }
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};

export default Navbar;
