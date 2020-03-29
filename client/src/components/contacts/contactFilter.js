import React , { useContext, useRef , useEffect} from 'react'
import ContactContext from './../../context/Contact/ContactContext';

const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { filterContact, clearFilter, filtered } = contactContext;
    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = ''
        }
    }, [filtered, contactContext])

    const onChange = (event) => {
        if (text.current.value !== ''){
            filterContact(event.target.value)
        } else {
            clearFilter();
        }
    }
    return (
        <input ref={text} type="text" placeholder="Filter contacts ..." onChange={onChange} />
    )
}

export default ContactFilter