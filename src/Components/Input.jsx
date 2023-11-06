// Here we will use forward ref hook
// Here we need ID usually, So we need to import useId.

import React, { useId, forwardRef } from 'react'

// Now below we are binding the function in forward ref Hook, whenever we bind our function in any Hook we can use arraow function which looks 
// easy, And then We are taking parameters in Input
const Input = forwardRef(function Input({
    // Here below we are passing arguments
    label,
    type = "text",
    className = "",
    ...props

    // Now whoever use this component they need to pass a reference here, We define the reference ({ref}) after the parameters in objects.
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {/* Now if anyone passes the label to this component, then we display it or we don't */}
            {
                label &&
                <label className='inline-block mb-1 pl-1'
                    // We are using htmlFor for accessbility purpose by providing ID to it. It generates unique id everytime
                    htmlFor={id}
                >
                    {label}
                </label>
            }
            <input type={type} className={`px-3 py-2 rounded-lg bg-white text-black outline-none
            focus:bg-gray-50 duration-200 border border-gray-200 w-full 
            ${className} `}
            // Now here we pass the {ref} in ref which we get from the user as prop.. 
            // This is the thing that will give the reference in our parent component.
            // referene is passed from the parent component to this component, and then we will get the access of state from here.
            ref = {ref}  

            // Passing other props and destructured it
            {...props}
            
            // giving id here as well
            id = {id}
            />
        </div>
    )
});

export default Input