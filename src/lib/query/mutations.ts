import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createNewPost, createNewUser, getRecentPosts, signInAccount, signOutFromAccount } from "../appwrite/api";
import { NewUserType, PostType } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

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

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: PostType) => createNewPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RESENT_POSTS]
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RESENT_POSTS],
        queryFn: getRecentPosts,
    })
}