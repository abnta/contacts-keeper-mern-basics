import { GET_CONTACTS ,ADD_CONTACT, DELETE_CONTACT, CONTACT_ERROR ,UPDATE_CONTACT, CLEAR_CONTACTS, FILTER_CONTACTS, CLEAR_FILTER, SET_CURRENT, CLEAR_CURRENT } from './../types'

export default (state,action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                loading: false,
                contacts: action.payload
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loading: false
            }
        case DELETE_CONTACT:
            return {
                ...state,
                loading: false,
                contacts: state.contacts.filter((contact) => contact._id !== action.payload)
            }
        case CONTACT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                loading: false,
                contacts: state.contacts.map((contact) => {
                    if (contact._id !== action.payload._id){
                        return contact
                    } else {
                        return action.payload
                    }
                })
            }
        case CLEAR_CONTACTS: 
            return {
                ...state,
                contacts: null,
                filtered:null,
                error: null,
                current: null
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                loading: false,
                filtered: state.contacts.filter((contact) =>{
                    const regex = new RegExp(`${action.payload}`,'gi');
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state
    }
}