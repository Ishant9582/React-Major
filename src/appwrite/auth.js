import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf"
export  const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
     
export  const account  =  new Account(client) ;
export  async function createaccount({email,password,name}){
    try{
        const useraccount = await account.create
        (ID.unique() , email , password , name);
        if(useraccount){
            // agr user ne login kr hi dia to usko login bhi krwa do and directly login k baad vale page p pohucha do
            return login({email,password})
        }
        else{
            return useraccount ;
        }
    }
    catch(err){
        throw err ;
    }
}

export  async function login({email,password}){
    try{
        return await account.createEmailPasswordSession(email,password);

    }catch(err){
        throw err ;
    }
}

export  async function getcurrentuser(){
   
    try{
       
        return await account.get()
    }catch(err){
       
        console.log("appwrite service :err",err) ;
    }
    return null ;
}
export  async function Logout(){
    try{
        await account.deleteSessions() ;
    }
    catch(err){
        console.log("err",err) ;
    }
}

// for fetching userdata

export async function fetchUserData() {
    try {
      const userData = await account.get();
    //   console.log(userData); // Check the fetched data
      return userData;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

//   export const updateUserData = async (newUsername, newEmail) => {
//     const databaseId = 'conf.appwriteDatabaseId';    // Replace with your database ID
//     const collectionId = 'conf.appwriteCollectionId';  // Replace with your collection ID
//     const documentId = '[DOCUMENT_ID]';   // Replace with the document (user) ID you want to update
  
//     try {
//       const response = await account.updateDocument(
//         databaseId ,
//         collectionId ,
//         documentId ,
//         {
//           username: newUsername ,   
//           email: newEmail ,
//         }
//       );
//       return response;
//     } catch (error) {
//       throw new Error("Failed to update user");
//     }
//   };