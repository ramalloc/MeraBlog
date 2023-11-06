// Here We are creating a common button that we will use in different component
//  Here we define those parameters whose are accepting by button and also we will se the way of using it 

import React from 'react'

const Button = ({
    // children parameter is that text which we want to visible in button
    children,

    // type of button, we can give submit also
    type = 'button',

    // default css 
    bgColor = 'bg-blue-600',
    textColor = 'text-white',

    // Classname usually we take empty
    className = '',

    // And if we passed other props then we take other props as well and destructure it
    ...props 


}) => {
  return (
    // when we apply calsses like - ' ', in it. We have to use it backticks(``) but we cannot use backticks without curly braces 
    // So we write classes in backticks and backtick should be in curly braces
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
    // If user passed other properties then we just used it as destructred prop
    {...props}
    >
        {children}
    </button>
  )
}

export default Button

{/* Forward Referance Hook -> It is a React Hook, which used rarely
  Use of Forward Ref -> We are making our login form and in that form we have our input field separately. We will use that input field
  wherever we want to use like - username, password etc. 
  -> When we are using any input field component in many other components like here in login Form, But when are using the input field 
      we need the reference of State in login form from the input field, Here we use Forward Ref Hook 
*/}