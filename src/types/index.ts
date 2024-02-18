import React from "react";

export type NewUserType = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
}

export type UserContextType = {
    user: IUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<IUser>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}