import React from 'react'
const Logo = (props) => {
  return (
    <div className={`${props.logoColor ? props.logoColor: "text-white"} font-bold text-3xl font-mono text}`}>
      MeraBlog
    </div>
  )
}

export default Logo