import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, deletePost, deleteFile } from "../appwrite/config";
import { Container } from "../components";
import ImageGallery from "../components/image";
import { useSelector, useDispatch } from "react-redux";
import AddComment from "./comments";
import { format } from "date-fns";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteComment } from "../appwrite/comment";

export default function Post() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showAlert, setShowAlert] = useState(true); // For controlling the alert visibility
  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isAuthor, setIsAuthor] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (slug) {
      getPost(slug)
        .then((fetchedPost) => {
          console.log(fetchedPost)
          if (fetchedPost) {
            setPost(fetchedPost) ;
            console.log(userData.labels  == "admin") ;
            setIsAuthor(fetchedPost.userid == userData.$id);
            setIsAdmin(userData.labels == "admin");
           
            setComments(fetchedPost.comments || []); // Initialize comments
            toast.success("Post fetched successfully");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error("Failed to fetch post");
          console.error("Failed to fetch post:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate, dispatch]);

  const handleDeletePost = () => {
    console.log(post.$id);
    deletePost(post.$id)
      .then((status) => {
        if (status) {
          deleteFile(post.image)
            .then(() => {
              toast.success("Post deleted successfully");
              navigate("/all-posts");
            })
            .catch((error) => console.error("Failed to delete file:", error));
        }
      })
      .catch((error) => console.error("Failed to delete post:", error));
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId)
      .then((status) => {
        if (status) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.$id !== commentId)
          );
          toast.success("Comment deleted successfully");
        }
      })
      .catch((error) => {
        toast.error("Failed to delete comment");
        console.error("Failed to delete comment:", error);
      });
  };

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const closeAlert = () => {
    setShowAlert(false); // This will hide the alert box
  };
  console.log(userData);
  console.log(post)
  return post ? (
    <>
      <Container>
        {showAlert && (
          <div
            id="alert-1"
            className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ms-3 text-sm font-medium">
              You need to be an author or an admin to perform deletion or updation.
            </div>
            <button
              type="button"
              onClick={closeAlert}
              className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center min-h-screen mt-8 mb-8">
          <div className="w-full max-w-lg mx-auto mb-6">
            <ImageGallery image={post.image} className="w-full h-auto object-contain rounded-lg shadow-md" />
            <h1 className="text-3xl font-bold mb-4 mt-8">Created By : {post.userid} </h1>
            <h2 className="text-3xl font-bold mb-4 mt-8">{post.Title}</h2>
            <div
              className="p-4 max-w-5xl mx-auto text-left border border-gray-400 sm:border-2 md:border-4 lg:border-8 p-4 overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>

          <div className="text-center">
            <div className="mt-6 flex justify-center space-x-4">
              {(isAuthor || isAdmin) && (
                <div>
                  <Link to={`/edit-post/${post.$id}`}>
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                      Edit
                    </button>
                  </Link>
                  &nbsp; &nbsp; &nbsp;
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={handleDeletePost}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div className="w-full max-w-3xl mx-auto mt-10">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            <AddComment postId={post.$id} onNewComment={handleNewComment} />

            {comments.length === 0 ? (
              <p className="mt-4 text-gray-600">No comments yet.</p>
            ) : (
              <div className="mt-6 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.$id} className="bg-white p-4 rounded-lg shadow-md border">
                    <p className="text-gray-800">{comment.text}</p>
              
                    <p className="text-gray-500 text-sm mt-2">
                      {format(new Date(comment.createdAt), "PPP p")}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {comment.author ? `By: ${comment.author}` : "Anonymous"}
                    </p>
                    <p>
                      { ((comment.userid == userData.$id)|| isAdmin || isAuthor) && (
                        <button
                          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                          onClick={() => handleDeleteComment(comment.$id)}
                        >
                          Delete
                          
                        </button>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  ) : null;
}
