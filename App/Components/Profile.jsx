import React from 'react';
import PropTypes from 'prop-types';

const Profile = props => (
  <div>
    <h2>Hows this look?</h2>
    <img alt="X" src={props.user.imageUrl} />
  </div>
);

Profile.propTypes = {
  user: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default Profile;
