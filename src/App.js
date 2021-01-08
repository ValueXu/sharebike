import React from 'react';
//import logo from './logo.svg';

class App extends React.Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
