import React from "react";
import PropTypes from "prop-types";
import classes from "./FullPost.module.scss";
import { requiredInjectedLogPropTypes } from "../../utils/utils";

const FullPost = ({ post, greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  return (
    <div className={classes.FullPost}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};
FullPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  ...requiredInjectedLogPropTypes,
};

export default FullPost;
