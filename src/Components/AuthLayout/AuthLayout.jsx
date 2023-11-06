{/* We will use this layout in future as well, 
    -> This is a mechanism about that how pages and routes are protected, So it is a protection mechanism.
    -> It is protected container only in which we descide that to show the valus  
*/}

import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// We are giving the file name and function name different here.
// We are getting two props here 1st is children and second is authentication, we are setting the by default value of authentication is true.
// We conditionally render the children of prop.
const Protected = ({children, authentication = true}) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    // Now we will check in store that the user is logged in or not, We are not using the values passed by user
    const authStatus = useSelector(state => state.auth.status); 

    // useEffect will descide to send the user to login, Home or any page. And if there is any change in specified field it will recheck.
    useEffect(() => {
        // Now we will check that the user's authentication is same as authStatus or not

        // If authentication is true but authStatus is not true
        if(authentication && authStatus !== authentication){
            navigate("/login");
        }
        // If authentication is not true and authStatus is not true
        else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoading(false);
    }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected;