import React, { useContext, Fragment } from "react";
//import { CSSTransition, TransitionGroup } from 'react-transition-group'

import ContactContext from "./../../context/Contact/ContactContext";
import ContactItem from "./contactItem";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;

  if (!contacts.length) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map(contact => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
    </Fragment>
  );
};

export default Contacts;
