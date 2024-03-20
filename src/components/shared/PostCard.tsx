// import { PostType } from "@/types"
import { useUserContext } from "@/context/UserContext";
import { calculateTimeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return null;

  return (
    <div className="bg-dark-2 rounded-2xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm">
      <div className="flex-between">
        <div className="flex items-center gap-3 md:gap-5">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              alt="user's profile photo"
              className="w-[38px] h-[38px] rounded-full"
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
            />
          </Link>
          <div className="flex flex-col">
            <p className="font-medium leading-[140%] text-light-1">
              {post.creator?.name}
            </p>
            <div className="flex-center text-light-3 gap-5">
              <p className="">{calculateTimeAgo(post.$createdAt)}</p>-
              <p className="">{post.location}</p>
            </div>
          </div>
        </div>
        <div>
          {user.id === post?.creator.$id ? (
            <Link to={`/update-post/${post.$id}`}>
              <img
                src="/assets/icons/edit.svg"
                width={25}
                height={25}
                alt="edit post"
              />
            </Link>
          ) : (
            <div className="italic text-light-3">Only creator can edit</div>
          )}
        </div>
      </div>

      <Link to={`/posts/${post.$id}`} className="">
        <div className="text-[14px] font-medium leading-[140%] py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, i: number) => (
              <li key={tag + i} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post?.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt={post.caption}
          className="post-card-img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />

    </div>
  );
};
export default PostCard;
