import PropTypes from "prop-types";

/**
 * Name extractor component
 *
 * gets single child and returns child name inside props as componentName
 *
 */

const NameExtractorHOC = ({ children }) => {
  const newChildren = {
    ...children,
    props: { ...children.props, componentName: children.type.name },
  };

  return newChildren;
};

NameExtractorHOC.propTypes = {
  children: PropTypes.element.isRequired, // verify there is only single child inside
};

export default NameExtractorHOC;
