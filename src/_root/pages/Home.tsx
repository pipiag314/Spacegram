import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/query/mutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isError, isPending: isLoadingPosts } = useGetRecentPosts();
  
  return (
    <div className="flex flex-1">
      <div className="main-container">
        <div className="home_posts-container">
          <h2 className="h3-bold md:h2-bold text-left w-full">Feeds.</h2>
          {isLoadingPosts && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-5 lg:gap-8 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
export default Home;