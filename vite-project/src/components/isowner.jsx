
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost } from '../appwrite/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Protected({ children }) {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const fetchPostData = async () => {
        if (slug) {
            try {
                const fetchedPost = await getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    setIsAuthor(fetchedPost.userid === userData.$id);
                    setIsAdmin(userData.labels == "admin");
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

    useEffect(() => {
        if (userData) {
            fetchPostData();
        } else {
            navigate('/');
        }
    }, [slug, userData, navigate]);
    useEffect(() => {
        if (post && !isAuthor && !isAdmin) {
            toast.error("you should be  the author or admin to perform this action")
            navigate('/all-posts');
        }
    }, [post, isAuthor, isAdmin, navigate]);

    if (!post) {
        return <h1>Loading...</h1>; // Show loading state or alternative content
    }

    return <>{children}</>;
}

export default Protected;





