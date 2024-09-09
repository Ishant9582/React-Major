// src/utils/appwriteUtils.js

import { Client, Databases, ID } from 'appwrite';
import conf from '../conf/conf';
import { getPost } from '../appwrite/config';

// Initialize the Appwrite client and databases
const client = new Client();
const databases = new Databases(client);

client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

// Function to add a comment
export const addComment = async (postId, commentText, user) => {
  try {
    // Step 1: Create the comment in the comments collection
    const commentResponse = await databases.createDocument(
      '66c49130002c58140821', // Replace with your comments collection ID
      '66d45230001f221e8b25', // Replace with your comments collection ID
      ID.unique(), // Generates a unique ID for the comment
      {
        postId, // Associate the comment with the post using Document ID
        text: commentText, // The actual comment content
        author: user.name || 'Anonymous',
        userid: user.$id,
        createdAt: new Date().toISOString(), // Timestamp for the comment
      }
    );

    // Step 2: Update the post document to include the comment's ID
    const postResponse = await getPost(postId);

    const updatedComments = postResponse.comments
      ? [...postResponse.comments, commentResponse.$id]
      : [commentResponse.$id];

    // Update the post document with the new comments array
    await databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      postId,
      { comments: updatedComments } // Update the comments field with the new array
    );

    return commentResponse; // Return the response for further use
  } catch (error) {
    console.error('Error adding comment or updating post:', error);
    throw error; // Propagate the error
  }
};


export async function deleteComment(commentid){
  console.log(commentid)
  try{
      await databases.deleteDocument(
        '66c49130002c58140821', // Replace with your comments database ID
        '66d45230001f221e8b25', // Replace with your comments collection ID
        commentid , // documentId
      )
      return true ;
  }catch(err){
      console.log("error in deleting",err)
      return false ;
  }
}



