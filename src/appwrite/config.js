import { Client, ID, Databases, Storage, Query } from "appwrite";

import conf from "../conf/conf"


export const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

export const databases = new Databases(client);

export const bucket = new Storage(client)

// create
export async function  createPost({Title , slug , content , image,status,userid}){
    try{
        console.log(slug)
             return await databases.createDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId,
                slug,  // unique id given to post with which we access it
                {
                    Title ,
                    content ,
                    image ,
                    status ,
                    userid ,
                }        
             )
    }catch(err){
        console.log("error found",err)
    }

}

// update
 export async function updatePost(slug , {Title , content , image,status,userid}){
    try{
        await databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug ,
            {
                Title ,
                content ,
                image ,
                status ,
            }
        );   
    }catch(err){
        console.log("err",err)
    }
 }


 // delete
 export async function deletePost(slug){
    try{
        console.log(slug)
        await databases.deleteDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug , // documentId
        )
        return true ;
    }catch(err){
        console.log("error in deleting",err)
        return false ;
    }
}


// get document for accessing single post
export async function getPost(slug){
    try{
        return await databases.getDocument(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            slug, // documentId
        )
        return true ;
    }
    catch(err){
        console.log("post not found" ,err)
        return false ;
    }
}


// get all documents
export async function getPosts(queries = [Query.equal("status","active")]){
    try{
        return await databases.listDocuments(
            conf.appwriteDatabaseId, // databaseId
            conf.appwriteCollectionId, // collectionId
            queries , 
        );
    }catch(err){
        console.log("error in fetchinfg all details",err)
        return false ;

    }
}

// for uploading file 
export async function uploadfile(file){
    try{
        console.log(file)
        return await bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file ,
        );
    }
    catch(err){
        console.log("appwrite service",err)
        return false ;
    }
}

// for deleting file

export async function deleteFile(fileId){
    try{
        await bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    }catch(err){
        console.log("error file mot deletd",err)
        return false
    }
}

export async function fetchImage(image){
    try {
        // Replace 'bucketID' with your actual bucket ID
        const result = await bucket.getFilePreview(conf.appwriteBucketId, image);

        // Create URL to access the image
        const imageURL = result.href;
        return imageURL ;
        
    } catch (error) {
        console.error("Error fetching the image: ", error);
    }
};
