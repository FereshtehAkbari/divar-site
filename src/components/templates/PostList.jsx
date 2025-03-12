import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/user";
import { LoaderIcon } from "react-hot-toast";
import styles from "./PostList.module.css";
//نمایش آگهی های ثبت شده خود فرد
function PostList() {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { data, isLoading } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });
  console.log(data);

  return (
    <div className={styles.list}>
      {isLoading ? (
        <LoaderIcon />
      ) : (
        <>
          <h3>آگهی های شما</h3>

          {data?.data?.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${baseURL}${post.images[0]}`} />
              <div>
                <p>{post.options?.title}</p>
                <span>{post.options?.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{post.amount}تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
