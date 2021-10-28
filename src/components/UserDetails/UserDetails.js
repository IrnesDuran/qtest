import React from "react";
import PropTypes from "prop-types";
import classes from "./UserDetails.module.scss";
import { requiredInjectedLogPropTypes } from "../../utils/utils";

const UserDetails = ({ user, greetingsMessage, componentName }) => {
  console.log(`${greetingsMessage} ${componentName}`);

  return (
    <div className={classes.UserDetails}>
      <h4>About the author:</h4>
      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{user.website}</span>
      <span>{user.company.name}</span>
      <span>{user.address.city}</span>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    website: PropTypes.string,
    company: PropTypes.shape({ name: PropTypes.string.isRequired }),
    address: PropTypes.shape({ city: PropTypes.string.isRequired }),
  }).isRequired,
  ...requiredInjectedLogPropTypes,
};

export default UserDetails;
