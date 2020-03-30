import React, { useContext, Fragment, useEffect } from "react";

import ContactContext from "./../../context/Contact/ContactContext";
import ContactItem from "./contactItem";
import Spinner from "./../layout/spinner"

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
  },[])

  if (contacts !== null && !contacts.length && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
    { contacts !== null && !loading? (<Fragment>
      {filtered !== null
        ? filtered.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        : contacts.map(contact => {
            return <ContactItem key={contact._id} contact={contact} />;
          })}
    </Fragment>) : <Spinner />}
    </Fragment>
  );
};

export default Contacts;
