import "App.scss";
import {Post} from "components/Post";
import {PostModel} from "models/PostModel";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "store";
import {setLoadingPost, setPosts} from "store/actions/postAction";
import CircularProgress from "@mui/material/CircularProgress";
import Button from '@mui/material/Button';

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const action = useDispatch();
  const { posts, postLoading, hasNextPage, currentPage } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    action(setLoadingPost(true));
    action(setPosts(1, []));
  }, []);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    hasNextPage && action(setPosts(currentPage+1, posts!));
  }

  if (postLoading) {
    return (
      <div className="home-wrapper">
        <CircularProgress size={40} />
      </div>
    );
  }

  return (
    <div className="home-wrapper">
      {posts &&
        posts.map((post: PostModel) => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      {hasNextPage && <Button onClick={handleClick}>Load more posts...</Button>}
    </div>
  );
};
