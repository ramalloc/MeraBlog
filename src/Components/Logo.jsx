import React from 'react'
import { Link } from 'react-router-dom'

const Logo = (props) => {
  return (
    <div className={`text-white font-bold text-3xl font-mono ${props.logoColor}`}>
      MeraBlog
    </div>
  )
}

export default Logo