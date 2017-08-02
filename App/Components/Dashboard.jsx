import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <img alt="X" src={this.props.user.imageUrl} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.shape({
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default Dashboard;
