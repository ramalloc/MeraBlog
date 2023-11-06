{/* we will make header according to the user status 
  -> First we make logout button component and then we conditionally render the logout button, if user is logged in then we show 
      logout button.
*/}

import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Header = () => {
  // Now we have to check from the state that the user is authenticated or not.
  // So we check through useSelector method which returns callback function and from that callback funciton we have access of current state.
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  // Whenever we make navigation bar like this then we make a array and we loop on that array
  // Array contaons Objects and Objects have values like name and path 
  // We use this method in production grade apps
  const navitems = [
    {
      name: "Home",
      slugUrl: "/",
      active: true
    },
    {
      name: "Login",
      slugUrl: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slugUrl: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slugUrl: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slugUrl: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-blue-900'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {/* Now we will use map to loop on navItems and also checks that the item s active or not */}
            {navitems.map((item) =>
              // If Item is active then we want to display  else we want null 
              item.active ? (
                <li key={item.name} className='text-white text-lg'>
                  {/* We will make button and also we have to add some properties in it to set url  */}
                  <button
                    onClick={() => navigate(item.slugUrl)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-700 rounded-full'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/*  Now we will implement logout btn, Below line is a react feature when authStatus is true then only data in () will be showen. */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header