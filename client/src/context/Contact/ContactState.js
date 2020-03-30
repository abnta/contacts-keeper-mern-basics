import React, { useReducer } from 'react'
import axios from 'axios';

import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { GET_CONTACTS,ADD_CONTACT, DELETE_CONTACT, CLEAR_CONTACTS, CONTACT_ERROR ,UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_FILTER, SET_CURRENT, CLEAR_CURRENT } from './../types'


const ContactState = (props) => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer,initialState);
    //GET CONTACTS
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts')
            dispatch({ type:GET_CONTACTS, payload: res.data });
        } catch(error) {
            console.log(error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.message })
        }
        
    }

    // Add contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts',contact,config)
            dispatch({ type:ADD_CONTACT, payload: res.data });
        } catch(error) {
            console.log(error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.message })
        }
        
    }

    // Delete Contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({type: DELETE_CONTACT, payload: id});
        } catch(error) {
            console.log(error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.message })
        }
    }

     // Update Contact
     const updateContact =  async (contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`,contact,config)
            dispatch({type: UPDATE_CONTACT, payload: res.data});
        } catch(error) {
            console.log(error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.message })
        }
    }

    // Set Current Contact
    const setCurrent = (contact) => {
        dispatch({type: SET_CURRENT, payload: contact});
    }

    // Clear Current Contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }

    // clear contacts
    const clearContacts =  () => {
        dispatch({type: CLEAR_CONTACTS});
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
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts,
        filtered: state.filtered
    }}>
        {props.children}
         </ContactContext.Provider>)

}

export default ContactState
