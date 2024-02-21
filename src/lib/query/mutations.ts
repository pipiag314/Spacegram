import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createNewUser, signInAccount, signOutFromAccount } from "../appwrite/api";
import { NewUserType } from "@/types";

export const useCreateUserMutation = () => {
    return useMutation({
        mutationFn: (user: NewUserType) => createNewUser(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string; }) => signInAccount(user),
    })
}


export const useSignOutFromAccount = () => {
    return useMutation({
        mutationFn: signOutFromAccount,
    })
}