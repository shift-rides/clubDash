import React from 'react';
import PropTypes from 'prop-types';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <img alt="X" src={this.props.profile.imageUrl} />
        <h1>{this.props.profile.name}</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default Profile;
