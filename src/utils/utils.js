import PropTypes from "prop-types";

export const requiredLogPropTypes = {
  greetingsMessage: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};

export const requiredInjectedLogPropTypes = {
  greetingsMessage: PropTypes.string.isRequired,
  componentName: PropTypes.string,
};
