import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import classes from "./PostsListItem.module.scss";
import { getUserAndComments } from "../../services/services";
import { Comments } from "../Comments/Comments";
import NameExtractorHOC from "../NameExtractorHOC/NameExtractorHOC";

/**
 * PostsListItem to display a single post inside Posts List
 * @property {object} post forwarded by the parent
 * @property {string} greetingsMessage forwarded as prop through parent as an assignment requirement
 * that is why it is not collected through context
 * @property {string} componentName drilled by HOC by extracting the functional component name
 * @returns {JSX.Element} component itself
 * @component
 * @example
 * return (
 *     <PostsList posts={posts} greetingsMessage={greetingsMessage} />
 * )
 */
const PostsListItem = ({ post, greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  const history = useHistory();
  const userId = post.userId;
  const postId = post.id;
  const [postItems, setPostItems] = useState(null);

  useEffect(() => {
    const tryFetch = async () => {
      const postItems = await getUserAndComments(userId, postId);
      setPostItems(postItems);
    };
    tryFetch();
  }, [userId, postId]);

  const clickHandler = () => {
    history.push({
      pathname: `/post/${post.id}`,
      state: { ...postItems, post: post }, //forward state through router since it will never be used anywhere else
    });
  };

  return (
    <div className={classes.PostsListItem} onClick={clickHandler}>
      <h4>
        {post.title}
        <span>{postItems ? `by ${postItems.user.name}` : "..."}</span>
      </h4>{" "}
      <p>{post.body}</p>
      <NameExtractorHOC>
        <Comments
          comments={postItems?.comments}
          greetingsMessage={greetingsMessage}
        />
      </NameExtractorHOC>
    </div>
  );
};

PostsListItem.propTypes = {
  post: PropTypes.exact({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  greetingsMessage: PropTypes.string.isRequired,
  componentName: PropTypes.string,
};

export default PostsListItem;
