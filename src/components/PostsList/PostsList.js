import React from "react";
import PropTypes from "prop-types";
import classes from "./PostsList.module.scss";
import PostsListItem from "../PostsListItem/PostsListItem";
import NameExtractorHOC from "../NameExtractorHOC/NameExtractorHOC";
import { requiredInjectedLogPropTypes } from "../../utils/utils";

/**
 * PostsList to display all posts inside Posts page and its wrapper
 * @property {array} posts API fetched post array
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
const PostsList = ({ posts, greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  return (
    <div className={classes.PostsList}>
      {posts.map((post) => (
        <NameExtractorHOC key={post.id}>
          <PostsListItem post={post} greetingsMessage={greetingsMessage} />
        </NameExtractorHOC>
      ))}
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  ...requiredInjectedLogPropTypes,
};

export default PostsList;
