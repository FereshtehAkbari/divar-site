import { useQuery } from "@tanstack/react-query";

import Main from "../components/templates/Main";
import Sidebar from "../components/templates/Sidebar";
import { getAllPosts } from "../services/user";
import { getCategory } from "../services/admin";
import Loader from "../components/modules/Loader";

const style = { display: "flex" };
function HomePage() {
  const { data: posts, isLoading: postLoading } = useQuery({
    queryKey: ["post-list"],
    queryFn: getAllPosts,
  });

  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  return (
    <>
      {postLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar categories={categories} />
          <Main posts={posts} />
        </div>
      )}
    </>
  );
}

export default HomePage;
