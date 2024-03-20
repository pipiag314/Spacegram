import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/query/mutations";
import { checkIfUserLikedPost } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesArray = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesArray);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePostMutate } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();


  useEffect(() => {
    const savedPost = currentUser?.save.find(
        (saved: Models.Document) => saved.$id === post.$id
      );

    if(savedPost) {
        setIsSaved(true);
    }
    
  }, []);
  
  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let updatedLikes = [...likes];

    if (updatedLikes.includes(userId)) {
      updatedLikes = updatedLikes.filter((id: string) => id !== userId);
    } else {
      updatedLikes.push(userId);
    }

    likePostMutate({postId: post.$id, likesArray: updatedLikes});
    setLikes(updatedLikes);
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const savedPost = currentUser?.save.find(
      (saved: Models.Document) => saved.$id === post.$id
    );

    if (savedPost) {
      setIsSaved(false);
      deleteSavedPost(savedPost.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="mt-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          onClick={handleLikePost}
          className="w-[25px] h-[25px] cursor-pointer"
          src={
            checkIfUserLikedPost(userId, likes)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div>
        <img
          onClick={handleSavePost}
          className="w-[25px] h-[25px] cursor-pointer"
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="save"
        />
      </div>
    </div>
  );
};
export default PostStats;
