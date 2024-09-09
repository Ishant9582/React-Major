import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import { getPosts } from "../appwrite/config";
import { useDispatch } from 'react-redux';
import { postin , postout} from '../store/postslice';
function AllPosts() {
    console.log("entering all post section");
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch() ;
    useEffect(() => {

        
        getPosts([]).then((posts) => {
            if (posts) {
                console.log("getting posts");
                console.log(posts);
                console.log(posts.documents);
                setPosts(posts.documents);
                posts.documents.map((a)=>{
                    console.log(a)
                    dispatch(postin(a));
                })
            }
        });
    }, []);

    console.log(posts);

    return (
        <div className='max-w-7xl mx-auto p-8'>
            <h1 className='text-4xl font-semibold text-gray-800 mb-8'>All Posts</h1>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
