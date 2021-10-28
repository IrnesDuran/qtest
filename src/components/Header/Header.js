import React from "react";
import PropTypes from "prop-types";
import classes from "./Header.module.scss";
import Logo from "../../assets/Logo-nav.svg";
import { requiredLogPropTypes } from "../../utils/utils";
import { Link, useLocation } from "react-router-dom";

/**
 * Header component
 * @property {string} greetingsMessage forwarded as prop through parent as an assignment requirement
 * that is why it is not collected through context
 * @property {string} componentName forwarded as prop through parent as an assignment requirement
 * @property {object} ctx context/state forwarded by the parnt which holds users to filter data from, and function to return rafined search back into the state
 * @returns {JSX.Element} component itself
 * @component
 * @example
 * return (
 *     <Header greetingsMessage={ctx.greetingsMessage} />
 * )
 */
const Header = ({ greetingsMessage, componentName, ctx }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  const location = useLocation();

  const inputHandler = (e) => {
    ctx.setFilter(e.target.value);
  };

  return (
    <header className={classes.Header}>
      <Link to="/posts" className={classes.logo}>
        <img src={Logo} alt="Q Logo" />
      </Link>
      {location.pathname === "/posts" && (
        <input
          // ref={inputRef}
          className={classes.searchBar}
          type="search"
          placeholder="Filter user data..."
          onChange={inputHandler}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  ...requiredLogPropTypes,
  ctx: PropTypes.object,
};

export default React.memo(Header);
