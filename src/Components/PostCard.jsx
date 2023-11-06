// When we logged in, we can see the post cards and onClicking in that card we can read that posts.

// We have to get the data from backend so we use appwrite service -> storageService
import storageServiceServer from '../Appwrite/storageService'
import { Link } from 'react-router-dom'

import React from 'react'

// To display this Post Card we have to pass some props and when we use query we will get these props from appwrite.
// We passed {id} prop as {$id} it is appwrite property or syntax for {id}
const PostCard = ({ $id, title, featuredImage }) => {
    return (

        // We want to make the post card clickable therefore we are using Link. In Link we don't need to pass the whole url 
        // we can pass that path after the url. 
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {/* In post card first we have Image, we have to give string in {src} of img but we cannot add string in {src}  */}
                    {/* We have to get the preview of image, So we have a method in storageService to get preview of an image by passing image {id} */}
                    {/* Post have different Id's and Images have different Id's */}
                    <img src={storageServiceServer.getFilePreview(featuredImage)} alt={title}
                        className='rounded-xl' />
                </div>
                {/* Then we have Title */}
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>

        </Link>
    )
}

export default PostCard

// Now we will make login component. 