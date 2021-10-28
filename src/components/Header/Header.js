import React, { useRef, useState } from "react";
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

  const [filter, setFilter] = useState("");

  const location = useLocation();
  const inputRef = useRef();

  const inputHandler = () => {
    setFilter(inputRef.current.value);
  };

  // filter users based on input value, check all user data values (rafined version)
  //NOTE:was not sure which user data to use, so I used majority from the user object
  const filteredData = ctx.users.filter((item) => {
    const lowercasedFilter = filter.toLowerCase().trim();
    const rafinedUser = {
      ...item,
      address: item.address.city,
      company: item.company.name,
    };

    return Object.keys(rafinedUser).some(
      (key) =>
        rafinedUser[key].toString().toLowerCase().includes(lowercasedFilter) &&
        lowercasedFilter !== ""
    );
  });

  console.log(filteredData);

  return (
    <header className={classes.Header}>
      <Link to="/posts" className={classes.logo}>
        <img src={Logo} alt="Q Logo" />
      </Link>
      {location.pathname === "/posts" && (
        <input
          ref={inputRef}
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
