import React from 'react';

// - External styles
import '../styles';

// - External components
import Icon from './Icon';

class App extends React.Component {

  constructor() {
    super();
    this.state = { icons: ['A', 'B', 'C', 'D', 'E']};
  }



  render() {


    return (



      <div className='app'>

        <h1>react-popover-portal</h1>

        <div className="container">
          {this.state.icons.map(icon => <Icon key={icon} icon={icon} />)}
        </div>

      </div>

    );
  }

}

export default App;
