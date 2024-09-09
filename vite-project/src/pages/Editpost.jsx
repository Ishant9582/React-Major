import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import { getPost } from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostData = async () => {
            if (slug) {
                try {
                    const fetchedPost = await getPost(slug);
                    if (fetchedPost) {
                        setPosts(fetchedPost);
                    } else {
                        toast.error("Post not found");
                        navigate('/');
                    }
                } catch (error) {
                    toast.error("Failed to fetch post");
                    console.error("Error fetching post:", error);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        };

        fetchPostData();
    }, [slug, navigate]);

    if (!post) {
        return <h1>Loading...</h1>; // Show loading state or alternative content
    }

    return (
        <div className='py-8'>
           
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
}

export default EditPost;
