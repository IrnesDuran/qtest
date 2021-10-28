import React from "react";
import PropTypes from "prop-types";
import classes from "./Comment.module.scss";
import { requiredInjectedLogPropTypes } from "../../utils/utils";

export const Comments = ({ comments, greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  const Comment = ({ comment }) => (
    <div className={classes.comment}>
      <q>
        <i>{comment.body}</i>
      </q>
      <b>by {comment.email}</b>
    </div>
  );

  return (
    <div className={classes.Comments}>
      {comments
        ? comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        : "..."}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired
  ),
  ...requiredInjectedLogPropTypes,
};

export default React.memo(Comments);
