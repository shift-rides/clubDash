import React from 'react';
import PropTypes from 'prop-types';

class Clubs extends React.Component {
  render() {
    return (
      <div>
        <h3>Clubs</h3>
      </div>
    );
  }
}

Clubs.propTypes = {
  profile: PropTypes.shape({
  }).isRequired,
};

export default Clubs;
