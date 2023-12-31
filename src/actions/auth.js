import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => {
    return async function(dispatch) {
        try {
            const { data } = await api.signIn(formData) ;
            
            dispatch({ type: AUTH , payload : data  }) ; 

            history.push('/') ; 
        } catch (error) {
            console.log(error);
        }
    }
}

export const signup = (formData, history) => {
    return async function(dispatch) {
        try {
            const { data } = await api.signUp(formData) ;
            
            dispatch({ type: AUTH , payload : data  }) ; 
    
            history.push('/') ; 
        } catch (error) {
            console.log(error);
        }
    }
}