import React, { useContext } from "react";
import PropTypes from 'prop-types'
import ContactContext from './../../context/Contact/ContactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext; 
  const { id, name, email, phone, type } = contact;

  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  }
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={`badge ${
            type === "professional" ? "badge-success" : "badge-primary"
          }`}
        >
          {type.split("").reduce((prev, next, i) => {
            if (i === 0) {
              return prev + next.toUpperCase();
            }
            return prev + next;
          }, "")}
        </span>
      </h3>
      <ul className="list">
        {email ? (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        ) : null}
        {phone ? (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        ) : null}
      </ul>
      <p>
          <button className="btn btn-dark brn-sm" onClick={() => setCurrent(contact)}>Edit</button>
          <button className="btn btn-danger brn-sm" onClick={onDelete}>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;
