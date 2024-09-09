import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "../index";
import RTE from "../RTE";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updatePost, uploadfile, deleteFile, createPost } from "../../appwrite/config";
import ImageGallery from '../image';
import { toast } from "react-toastify";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            Title: post?.Title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);
        setLoadingMessage(post ? "Updating post..." : "Adding post...");
        console.log(data);
        console.log("handlesubmit clicked");

        try {
            if (post) {
                const file = data.image[0] ? await uploadfile(data.image[0]) : null;
                console.log(post.image);
                if (file) {
                    console.log("entered delete file section");
                    await deleteFile(post.image); // Ensure deleteFile is awaited
                    console.log("file deleted");
                }

                const dbPost = await updatePost(post.$id, {
                    ...data,
                    image: file ? file.$id : undefined,
                });
                console.log(dbPost);

                toast.success("Post updated successfully");
                navigate(`/post/${post.$id}`);
            } else {
                console.log("post is absent");
                console.log(data.image);
                console.log(data.image[0]); // file info name and all that stuff

                // Uploading image in bucket
                const file = await uploadfile(data.image[0]);
                console.log(file);

                if (file) {
                    console.log("file found");
                    const fileId = file.$id;
                    data.image = fileId;
                    const dbPost = await createPost({ ...data, userid: userData.$id });
                    console.log(dbPost);

                    if (dbPost) {
                        toast.success("Post added successfully");
                        navigate(`/all-posts`);
                    } else {
                        toast.error("Post addition failed");
                    }
                }
            }
        } catch (error) {
            console.error("Error during submission:", error);
            toast.error("An error occurred during submission.");
        } finally {
            setLoading(false);
            setLoadingMessage(""); // Clear loading message after completion
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="relative flex items-center justify-center w-16 h-16">
                        <div className="absolute w-16 h-16 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-blue-500"></div>
                    </div>
                    <p className="text-gray-600 mt-4">{loadingMessage}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                    <div className="w-2/3 px-2">
                        <Input
                            label="Title :"
                            placeholder="Title"
                            className="mb-4"
                            {...register("Title", { required: true })}
                        />
                        <Input
                            label="Slug :"
                            placeholder="Slug"
                            className="mb-4"
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                    </div>
                    <div className="w-1/3 px-2">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="mb-4"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {post && (
                            <div className="w-full mb-4">
                                <ImageGallery image={post.image} />
                            </div>
                        )}
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mb-4"
                            {...register("status", { required: true })}
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-bold py-3 px-6 rounded-md shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 active:shadow-md"
                            disabled={loading} // Disable button while loading
                        >
                            {post ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

