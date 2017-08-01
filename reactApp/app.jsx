import React from 'react';
import ReactDOM from 'react-dom';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Hello React!</p>
      </div>
    );
  }
}

ReactDOM.render(<TodoApp />,
  document.getElementById('root'));
