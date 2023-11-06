{/* COntainer accepts property as a children, childran is a variable_name we take another varable_names also.
    In Container We define Styling Properties.
*/}

import React from 'react'

const Container = ({ children }) => {
    // When we are returning only one line or only one line is reducing then we can remove the paranthesis after return 
    return <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>;

}

export default Container