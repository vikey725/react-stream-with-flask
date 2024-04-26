import {createAuthProvider} from 'react-token-auth'
import axios from 'axios'

export const {useAuth, authFetch, login, logout} = 
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => axios.post('http://localhost:5000/refresh', {'refresh_token': token.refresh_token})
    })