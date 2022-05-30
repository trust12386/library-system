import React from 'react';
import Demo from './components/demo/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Demo name="bob"/>
      </div>
    )
  }
}
export default App;
