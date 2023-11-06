// We need useState to implement some functions
import React, { useState } from 'react'

// We need Link and useNavigate to forward the page
import { Link, useNavigate } from 'react-router-dom'

// We need login() method from the authSlice which is in Store. We can import any method or component from other name also using {as} 
// like -> {login as authLogin}
import { login as authLogin } from '../../Store/authSlice'

// Now we will import our utitlities Comoponents that we created like Button, Input, Logo
import { Button, Input, Logo } from '../index'

// We need useDispatch from react-redux  
import { useDispatch } from 'react-redux'

// We need auth from Appwrite as authService
import authServiceServer from '../../Appwrite/auth'

// Now we have to import useForm hook from react-hook-form
import { useForm } from 'react-hook-form'

const Login = () => {
  // Initialising useNavigate and useDispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialising useForm which returns register and handleSubmit
  const { register, handleSubmit } = useForm();

  // initialising state to show errors
  const [error, seterror] = useState("");

  // Now we will make a method called logins which logins the user by fetching the data from server thereore it is async as well, It takes Data.
  const logins = async (data) => {
    // Whenever we logins the user we have to empty out the errors, because when we are login the new user, the errors should be cleaned. 
    seterror("");

    try {
      // we have to check the details of the user and if user is present then we have to create a session which is handled by appwrrite
      // We are passing data to login method of authSlice because data is a wrapped data which consists many datas.
      // so login method returns a session, so we stored it in a variable names session 
      const session = await authServiceServer.login(data);

      // Now if session is created or present then we will get the current user's data from the server,
      // We are checking that the user is present or not. Then we will change the active status in redux Store
      if (session) {
        const userData = await authServiceServer.getCurrentUser();

        // If userData is present then we dispatch to login action in authSlice
        if (userData) {
          dispatch(authLogin(userData));
        }
        // if user is logged in then we have to send him to the root url
        // We are using useNavigate instance navigate, this will programmatically sends the user to the given url without clicking.
        // But Link just create the link to that component and user will navigate when user clicked on that component.
        navigate("/")
      }
    } catch (error) {
      // Now here we can set the error in setError State, and also we can show some messages.    
      seterror(error.message)
    }

  }


  return (
    <div
      className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" logoColor = "text-blue-500"/>
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;

          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {/* We want to display error if there is any error */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(logins)} className='mt-8'>
          {/* We got handleSubmit from the useForms, So whenever the form will be submitted or onSubmit event triggered
              there inside handleSubmit() will be called. handleSubmit() is a method in which we provide/pass our own method or way,
              in which we want to handle the form's submition.  
          */}
          <div className='space-y-5'>
            {/* Now we will use our Input component here and have to pass the props */}
            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"


              // Now below we are using registers, we have to write the syntax of register like this -> {...register()}
              // If we didn't write the register after spread operator then if we write the value in the other Input then it can also
              // change the values in other Input component 

              // In register we passed unique names for example here below we passed {...register("email")}
              // Second parameter in register we pass Object in register, And in this object we pass many options
              // 1st option we are using required then second option we are using pattern, we cannot pass pattern directly 
              // for using pattern we take validate: and we pass an object in Validate and further we passed the pattern which we want to use.
              // We passed some kind of alphanumeric and symbolic patterns which called {rejex} we can use any regex from regexr site,
              // we wrote the regex in slashes(//), after that we use {.test(value)} and passed the value to the test. 
              // If the data on Input is matched with that pattern then it is a valid addrress then the text will show

              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"

              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full"
            >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login