import { createContext, useContext } from 'react';
import { AuthContext } from './authContextProvider';

const useAuthContext = () => {
    return useContext(AuthContext)
}

export { useAuthContext }
