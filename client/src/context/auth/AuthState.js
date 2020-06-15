import React,{useReducer} from 'react';
import authReducer from './authReducer';
import AuthContext from './authContext';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = props =>{
    const initialState={
       token:localStorage.getItem('token'),
       user:null,
       isAuthenticated:null,
       loading:true,
       error:null
    };

    const [state,dispatch]=useReducer(authReducer, initialState)

    //Load user
    const loadUser=async () =>{ 
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        try {
            const res= await axios.get('/api/auth')

            dispatch({
                type:USER_LOADED,
                payload:res.data
            })

        } catch (error) {
            
            dispatch({
                type:AUTH_ERROR
            })
        }
    }

    //Register User
    const register= async formData =>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res= await axios.post('/api/users',formData,config)
            
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type:REGISTER_FAIL,
                payload:error.response.data.msg
            })
        }

    } 

    //Login User
    const login= async formData =>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        try {
            const res= await axios.post('/api/auth',formData,config)
            
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type:LOGIN_FAIL,
                payload:error.response.data.msg
            })
        }

    } 
    //Logout User
    const logout= () =>{dispatch({type:LOGOUT}) }

    //Clear Errors
    const clearErrors= () =>{
        dispatch({
            type:CLEAR_ERRORS
        })
     }

    return (
        <AuthContext.Provider
        value={{
            token:  state.token,
            isAuthenticated:state.isAuthenticated,
            loading:state.loading,
            error:state.error,
            user:state.user,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;