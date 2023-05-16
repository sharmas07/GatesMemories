import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user?user._id:''));
  }, []);

  const params = useParams();
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    
    <div className="Posts">
      {posts.length ===0 ? <h4>No posts, follow some people to see their posts</h4>:''}
      {posts.map((post, id) => {
        return <Post data={post} id={id} />;
      })}
      
    </div>
  );
};

export default Posts;
