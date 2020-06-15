import React,{useReducer} from 'react';

import contactReducer from './contactReducer';
import ContactContext from './contactContext';
import axios from 'axios'

import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACTS,
    CLEAR_CONTACTS
} from '../types';

const ContactState = props =>{
    const initialState={
        contacts:null,
        current:null,
        filtered:null,
        error:null
    };

    const [state,dispatch]=useReducer(contactReducer, initialState)

    //Get Contacts
    const getContacts= async ()=>{
        
        try {
            const res= await axios.get('/api/contacts')
            dispatch({type:GET_CONTACTS,payload:res.data})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
    }

    //Add Contact
    const addContact= async contact=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res= await axios.post('/api/contacts',contact,config)
            dispatch({type:ADD_CONTACT,payload:res.data})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
    }

    //Delete Conatact
    const deleteContact=async id=>{
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({type:DELETE_CONTACT,payload:id})

        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
        
    }

    //Clear Contacts
    const clearContacts=()=>{
       
        dispatch({type:CLEAR_CONTACTS})
    }

    //Set Current Contact
    const setCurrent=contact=>{
       
        dispatch({type:SET_CURRENT,payload:contact})
    }

    //Clear Current Contact
    const clearCurrent=()=>{
       
        dispatch({type:CLEAR_CURRENT})
    }

    //Update Contact
    const updateContact=async contact=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res= await axios.put(`/api/contacts/${contact._id}`,contact,config)
            dispatch({type:UPDATE_CONTACT,payload:res.data})
        } catch (error) {
            dispatch({type:CONTACT_ERROR, payload:error.response.msg})
        }
        
    }

    //Filter Contacts
    const filterContact=text=>{
       
        dispatch({type:FILTER_CONTACTS,payload:text})
    }
    //Clear Filter
    const clearFilter=()=>{
       
        dispatch({type:CLEAR_FILTER})
    }

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current:state.current,
            filtered:state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContacts,
            clearContacts,
            error:state.error
        }}>
            {props.children}
        </ContactContext.Provider>
    )

}

export default ContactState;