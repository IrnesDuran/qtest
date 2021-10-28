import React from "react";
import classes from "./Post.module.scss";
import { useLocation } from "react-router-dom";
import { requiredLogPropTypes } from "../../utils/utils";
import NameExtractorHOC from "../../components/NameExtractorHOC/NameExtractorHOC";
import { Comments } from "../../components/Comments/Comments";
import FullPost from "../../components/FullPost/FullPost";
import UserDetails from "../../components/UserDetails/UserDetails";

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

  return (
    <div className={classes.Post}>
      <section className={classes.PostSection}>
        <NameExtractorHOC>
          <FullPost
            post={location.state.post}
            greetingsMessage={greetingsMessage}
          />
        </NameExtractorHOC>
      </section>
      <section className={classes.comments}>
        <NameExtractorHOC>
          <Comments
            comments={location.state.comments}
            greetingsMessage={greetingsMessage}
          />
        </NameExtractorHOC>
      </section>
      <section className={classes.user}>
        <NameExtractorHOC>
          <UserDetails
            user={location.state.user}
            greetingsMessage={greetingsMessage}
          />
        </NameExtractorHOC>
      </section>
    </div>
  );
};

Post.propTypes = {
  ...requiredLogPropTypes,
};

export default Post;
