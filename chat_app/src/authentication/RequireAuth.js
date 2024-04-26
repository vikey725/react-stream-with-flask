import { Navigate, useLocation } from 'react-router-dom';
import {useAuthContext} from './AuthContext'
import { useState } from 'react';

function RequireAuth({ children }){
    const location = useLocation()
    const auth = useAuthContext() 
    const [user, setUser] = useState(
        localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")): null
    );
    
    if (!user) {
        return <Navigate to='/login' state={{from: location}} replace />
    }
    return children
}

export default RequireAuth