import axios from 'axios';
import {login} from '../auth';
import { useNavigate } from "react-router-dom";
import {useAuthContext} from '../authentication/AuthContext';

const Logout = () => {

  const auth = useAuthContext()

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
  };

  return (
    <h1>Successfully logged out!</h1>   
  );
};

export default Logout;
