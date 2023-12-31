import { AUTH, LOGOUT } from '../constants/actionTypes' ;

const reducer = (state = { authData : null } ,action)=>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('memoriesProfile' , JSON.stringify(action?.payload) ) ;
            return { ...state , authData : action?.payload } ;
        
        case LOGOUT:
            localStorage.clear() ;
            return { ...state , authData : null }
        default:
            return state ;
    }
}

export default reducer ;