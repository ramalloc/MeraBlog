// We have to make a query therefore we have to import useState and useEffect
import React, {useState, useEffect} from 'react'
import storageServiceServer from '../../Appwrite/storageService'
import { PostCard, Container } from '../index'

const AllPosts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    storageServiceServer.getAllPost([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })


  return (
    <div className='w-full py-8'>
    <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
        </Container>
</div>
  )
}

export default AllPosts