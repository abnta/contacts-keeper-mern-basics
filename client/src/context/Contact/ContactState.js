import React, { useReducer } from 'react'
import * as uuid from 'uuid'

import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, SET_CURRENT, CLEAR_CURRENT } from './../types'


const ContactState = (props) => {

    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Balram',
                email: 'balram@gmail.com',
                phone: '674523100',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Krishn',
                email: 'krishn@gmail.com',
                phone: '674576500',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Kans',
                email: 'kans@gmail.com',
                phone: '687097012',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(ContactReducer,initialState);

    // Add contact
    const addContact = (contact) => {
        contact.id = uuid.v4();
        dispatch({ type:ADD_CONTACT, payload: contact });
    }

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({type: DELETE_CONTACT, payload: id});
    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    // Update Contact
    const updateContact = (contact) => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    }
    // Filter Contacts
    const filterContact = (text) => {
        dispatch({type: FILTER_CONTACTS, payload: text});
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    }

    return (<ContactContext.Provider value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        filtered: state.filtered
    }}>
        {props.children}
         </ContactContext.Provider>)

}

export default ContactState
