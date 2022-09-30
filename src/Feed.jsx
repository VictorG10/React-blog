import React from "react";
import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <>
      {/* {posts.map(post => 9
        <Post key={post.id} post={post} />;
      ))} */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default Feed;
