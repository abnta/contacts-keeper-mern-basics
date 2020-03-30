import React, { useEffect, useContext } from 'react'

import Contacts from './../contacts/contacts'
import ContactForm from './../contacts/ContactForm';
import ContactFilter from './../contacts/contactFilter';

import AuthContext from './../../context/Auth/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // runs only once when the page loads
    }, [])

    return (
        <div className="grid-2">
            <div>
            <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home
