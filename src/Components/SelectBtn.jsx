import React, { forwardRef, useId } from 'react'

// We can use forward ref in export also
const SelectBtn = ({
    options,
    label,
    className = " ",
    ...props
}, ref) => {
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor='id' className=''>{label}</label>}
        <select 
        id={id}
        {...props}
        ref = {ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full 
        ${className}
        `}
        >
          {/* Now We will map options in a loop. We will not directly map the options because it is possible that options don't
              have values and app can be crashed, So therefore we conditionally loop. In callback function we will get option or
              item of options. We have to give key also, so option is also unique in itself therefore we can give option as key.
              We have to give value to the option 
            */}
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            
        </select>
    </div>
  )
}

export default forwardRef(SelectBtn)

// Now we willmake post card