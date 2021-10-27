import React from "react";
import classes from "./Post.module.scss";
import { useLocation } from "react-router-dom";
import { requiredLogPropTypes } from "../../utils/utils";
import NameExtractorHOC from "../../components/NameExtractorHOC/NameExtractorHOC";
import { Comments } from "../../components/Comments/Comments";

/**
 * Individual post page
 * @property {string} greetingsMessage forwarded as prop through parent as an assignment requirement
 * that is why it is not collected through context
 * @property {string} componentName forwarded as prop through parent as an assignment requirement
 * @returns {JSX.Element} component itself
 * @component
 * @example
 * return (
 *     <Post greetingsMessage={ctx.greetingsMessage} componentName={componentName}/>
 * )
 */
const Post = ({ greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  const location = useLocation();

  console.log(location.state);

  return (
    <div className={classes.Post}>
      <section className={classes.PostSection}>Post section</section>
      <section className={classes.comments}>
        {" "}
        <NameExtractorHOC>
          <Comments
            comments={location.state.comments}
            greetingsMessage={greetingsMessage}
          />
        </NameExtractorHOC>
      </section>
      <section className={classes.user}>User details</section>
    </div>
  );
};

Post.propTypes = {
  ...requiredLogPropTypes,
};

export default Post;
