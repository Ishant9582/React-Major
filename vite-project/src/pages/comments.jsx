// src/components/AddComment.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addComment } from '../appwrite/comment'; // Import the addComment function

const AddComment = ({ postId, onNewComment }) => {
  // Initialize the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const user = useSelector((state) => state.auth.userData);

  const onSubmit = async (data) => {
    try {
      // Call the addComment function from appwriteUtils.js
      const commentResponse = await addComment(postId, data.comment, user);

      // Notify the parent component about the new comment
      if (onNewComment) {
        onNewComment(commentResponse);
      }

      toast.success('Comment added successfully');
      reset(); // Clear the form after successful submission
    } catch (error) {
      toast.error('Failed to add comment.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-2 text-gray-700 font-semibold">Add a Comment</label>
        <textarea
          {...register('comment', { required: 'Comment is required' })}
          placeholder="Write your comment..."
          className={`w-full p-4 border ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Comment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;

