import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import classes from "./PostsListItem.module.scss";
// import Context from "../../store/context";
import { getUser } from "../../services/services";

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
  // const ctx = useContext(Context);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tryFetch = async () => {
      const user = await getUser(post.userId);
      setUser(user);
    };
    tryFetch();
  }, []);

  const clickHandler = () => {
    history.push(`/post/${post.id}`);
  };

  return (
    <div className={classes.PostsListItem} onClick={clickHandler}>
      <h4>
        {post.title}
        {user?.name && <span>by {user.name}</span>}
      </h4>{" "}
      <p>{post.body}</p>
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
