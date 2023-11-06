import React, {useEffect, useState} from 'react'
import { PostForm, Container } from '../index'
import { useNavigate,  useParams } from 'react-router-dom';
import storageServiceServer from '../../Appwrite/storageService';
function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            storageServiceServer.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
   ) : null
  
}

export default EditPost