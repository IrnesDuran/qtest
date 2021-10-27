import React from "react";
import classes from "./Header.module.scss";
import Logo from "../../assets/Logo-nav.svg";
import { requiredLogPropTypes } from "../../utils/utils";

/**
 * Header component
 * @property {string} greetingsMessage forwarded as prop through parent as an assignment requirement
 * that is why it is not collected through context
 * @property {string} componentName forwarded as prop through parent as an assignment requirement
 * @returns {JSX.Element} component itself
 * @component
 * @example
 * return (
 *     <Header greetingsMessage={ctx.greetingsMessage} />
 * )
 */
const Header = ({ greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  return (
    <header className={classes.Header}>
      <span>
        <img src={Logo} alt="Q Logo" />
      </span>
    </header>
  );
};

Header.propTypes = {
  ...requiredLogPropTypes,
};

export default React.memo(Header);
