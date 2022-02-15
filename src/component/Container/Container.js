import PropTypes from 'prop-types';

function Container ({ children }) {
  return <div>{children}</div>
};

Container.defaultProps = {
  children: [],
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;