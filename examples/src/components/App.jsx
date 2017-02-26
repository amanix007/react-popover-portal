import React from 'react';
import { Link } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import FlatButton from 'material-ui/FlatButton';

// - Just som meterial-ui stuff
injectTapEventPlugin();

// - External styles
import '../styles';

class App extends React.Component {

  constructor() {
    super();
    this.state = { activeIndex: 0 }
  }

  setActiveIndex(index) {
    this.setState({ activeIndex: index })
  }


  render() {

    return (

      <MuiThemeProvider>
        <div className='app'>

          <a href="https://github.com/onurhb/react-popover-portal"><img style={{position: 'absolute', top: '0px', right: '0px', border: '0px'}} src="https://camo.githubusercontent.com/52760788cde945287fbb584134c4cbc2bc36f904/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f77686974655f6666666666662e706e67" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_white_ffffff.png"/></a>

          <h1 id="head" style={{ fontSize: '72px' }}>react-popover-portal</h1>

          <div className="row center-xs between-xs toolbar">
            <div className="col-xs-2">
              <FlatButton backgroundColor={this.state.activeIndex == 0 ? 'rgba(255, 255, 255, 0.1)' : null} 
              containerElement={<Link to="/" />} label="Basic use" secondary={true} onClick={this.setActiveIndex.bind(this, 0)} />
            </div>
            <div className="col-xs-2">
              <FlatButton backgroundColor={this.state.activeIndex == 1 ? 'rgba(255, 255, 255, 0.1)' : null} 
              containerElement={<Link to="/arrow" />} label="With dynamic arrow" secondary={true} onClick={this.setActiveIndex.bind(this, 1)} />

            </div>
            <div className="col-xs-2">
              <FlatButton backgroundColor={this.state.activeIndex == 2 ? 'rgba(255, 255, 255, 0.1)' : null} 
              containerElement={<Link to="/animated" />} label="Animated" secondary={true} onClick={this.setActiveIndex.bind(this, 2)} />

            </div>
          </div>


          <div className="app-content">
            {this.props.children}
          </div>

        </div>
      </MuiThemeProvider>

    );
  }

}

export default App;
