import { ID, Query } from "appwrite";
import { NewUserType } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

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
        
    }
} 