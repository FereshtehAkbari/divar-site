import React from "react";
import AddPost from "../components/templates/AddPost";
import PostList from "../components/templates/PostList";
//آیکون ثبت آگهی
function DashboardPage() {
  return (
    <div>
      <AddPost />
      <PostList />
    </div>
  );
}

export default DashboardPage;
