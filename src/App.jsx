{/* 
Environment Variables :-
-> We will use any database or service where only our's application will  communicate to that service,
    because our services and database consist IDs, passwords, secret code or any data, so if we use here then it will create security issues.
-> So there are some variables which are system variables, the way of making and keeping those variables are different. 
    So whenever we deploy application in production at any system, We kept those variables and value at that system as it is.
-> The accessbility of these variables depends upon framworks or library, there are different ways in different pltfm and lbry.

Steps to make Environment Variables :-
Step-1> Make variables in projects root (means in main folder like README.md).
Step-2> Make a file named -> {.env} , We never pushed this file on github or in production. 
Step-3> It is in key-value pair, Key is in Capital Letter and Value should be in small letters and also we can write values in semi-colon(""),
        we can write values without semi-colon also.

Taking access of the environment file:- We take .env file access in backend and front-end differently, and also takes access in different
libraries and frameworks differently.
  For Example -> 
        1. When we make application from create-react-app method, we write .env file like REACT_APP_{variable_name_in_capital}
          and when we want to use it, we use it like - process.env.REACT_APP_{variable_name_in_capital}
        2. When We make application with vite there are two types of environment variables.
          We make .env variable like - VITE_{variable_name_in_capital} and to get access of environment varaible 
          like - import.meta.VITE_{variable_name_in_capital}. And the second env var is DB_PASSWORD, We can define value in DB_PASSWORD 
          normally, but when we access it we have to access it like - import.meta.DB_PASSWORD_{variable_name_in_capital},
          we cannot get the value, we will get undefined value. 

>>> Whenever we make any changes in .env files, we have to restart/run the project mostly. 

>>> We are making a file for storing all the env vars in string, because when we use env vars in app at different places it may be possible 
    that the env var would not load in the app or if the env var would be only in numbers but env vars should only be in String, So this 
    wcan create problems or can crash the app.
  -> So we are making a file and a folder in it by the name of Config.js or envImport.js 

  Vendor Locking :- 
  We should write our code like this that if we want to remove the authentication system from the appwrite then inspite of it our
  application should run and application should not get affected much.
  So here is concept called Servces, which means a we made class. We export some methods from the class and use that methods by providing
  some data to that method.   

*/}

import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authServiceServer from './Appwrite/auth'
import {login, logout} from './Store/authSlice'
import { Footer, Header } from './Components'
import { Outlet } from 'react-router-dom'

function App() {
  // Here we are making a loading State because when the app make a network request it will take time. 
  //  So whenever we make request to database and network, we should make a loading state to do condinal rendering using if-esle.
  const [loading, setloading] = useState(true);

  // Now we will implement useDispatch to get currentUser from the store
  const dispatch = useDispatch();

  // Now when the application loads we have to ask to the service that the user is logged in or not.  
  useEffect(() => {
    // Now we will call the service which gives currentUser, if get the current user we will use a {then} method
    // And if didn't get the currentUser we use finally(). Finally will call despite of there is {.then} or {.catch} 

    // Now when we get the data, so {.then} will call, It gives a callback which contains userData.
    // Now we want to dispatch the userData in authSlice / reducer
    authServiceServer.getCurrentUser().then((userData) => {
      // If there is userData then we dispatch the userData to the store through login function 
      if(userData){
        dispatch(login({userData}))
      }       
      // If there is no userData then we dispatch logout funciton of store.
      else{
        dispatch(logout());
      }
    })
    .finally(() => setloading(false))
  },[]);
  

  // Now we will do conditional rendering
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-sky-200'>
      <div className='w-full block'>
        <Header />
        {/* Now will render the components in between of the Header and Footer using {Outlet} in main component*/}
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null; 
}

export default App
