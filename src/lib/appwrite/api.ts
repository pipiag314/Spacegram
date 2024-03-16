import { ID, Query } from "appwrite";
import { NewUserType, PostType } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";



export const saveUserToDatabase = async (user: {
    accountId: string;
    name: string;
    email: string;
    imageUrl: URL;
    username?: string;
}) => {
    try {
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.usersCollectionId, ID.unique(), user)
        return newUser;
    } catch (error) {
        console.log("Error while saveing user into DB: ", error);
    }
}

export const createNewUser = async (user: NewUserType) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if(!newAccount) throw new Error("Error: while creating account");

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDatabase({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl
        });
        
        return newUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const signInAccount = async (user: {email: string; password: string}) => {
    try {
        const session = await account.createEmailSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log("Error while signin in to account: ", error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId, 
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log("Error while getting current user: ", error);
    }
} 

export const signOutFromAccount = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    
    } catch (error) {
        console.log("Error while signing out account: ", error);
    }
}

export const uploadFileToStorage = async (file: File) => {
    try {
        const res = await storage.createFile(appwriteConfig.storageId, ID.unique(), file)
        return res;
    } catch (error) {
        console.log("Error while uploading file to storage: ", error)
    }
}

export const getFileUrl = (fileId: string) => {
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            "",
            100
        );
        
        if(!fileUrl) throw new Error("Error occured while getting file url")

        return fileUrl;
    } catch (error) {
        console.log("Error occured while getting fileUrl: ", error);
    }
}

export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId);

        return { status: "ok" };
    } catch (error) {
        console.log(error);
    }
}

export const createNewPost = async (post: PostType) => {
    try {
        const uploaded = await uploadFileToStorage(post.file[0]);

        if(!uploaded) throw new Error("Error while uploading file into storage");

        const fileUrl = getFileUrl(uploaded.$id);

        if(!fileUrl) {
            deleteFile(uploaded.$id)
            throw new Error("can't get fileUrl");
        }

        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.postsCollectionId, 
            ID.unique(), 
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploaded.$id,
                location: post.location,
                tags: tags,
            }
        );

        if(!newPost) {
            deleteFile(uploaded.$id)
            throw new Error("Error while creating new post")
        }
        
        return newPost;
    } catch (error) {
        console.log("Error while saving post into DB: ", error)
    }
}