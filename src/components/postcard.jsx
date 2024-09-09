import React from "react";
import { Link } from "react-router-dom";
import ImageGallery from './image';

function PostCard({ $id, Title, image }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4 md:p-6'>
                <div className='w-full flex justify-center mb-4'>
                    <div className='w-full'>
                        <ImageGallery image={image} />
                    </div>
                </div>
                <h2 className='text-lg md:text-xl font-bold text-gray-800'>
                    {Title}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;
