import React from 'react';

// - External styles
import '../styles';

// - External components
import Icon from './Icon';
import Outsider from './AutoArrow'; // - LOL

class App extends React.Component {

  constructor() {
    super();
    this.state = { icons: ['A', 'B', 'C', 'D', 'E'], attachToHead: false, animationTime: 400, translateSpeed: 410, timeout: 1000 };
  }

  toggleAttatchToFirstParent() {
    this.setState({ attachToHead: !this.state.attachToHead });
  }

  onAnimationSpeedChange(e) {
    this.setState({ animationTime: Number(e.target.value) })
  }

  onTransitionSpeedChange(e) {
    this.setState({ translateSpeed: Number(e.target.value) })
  }

  onTimeoutChange(e) {
    this.setState({ timeout: Number(e.target.value) })
  }

  render() {

    return (

      <div className='app'>

        <h1 id="head" style={{ fontSize: '92px', marginBottom: '200px' }}>react-popover-portal</h1>

        <div className="container">
          {this.state.icons.map(icon => <Icon key={icon}
            animationTime={this.state.animationTime}
            translateSpeed={this.state.translateSpeed}
            timeout={this.state.timeout}
            parent={this.state.attachToHead ? 'head' : icon}
            icon={icon} />)}
        </div>
        
        <Outsider id='right' style={{left: '-5%'}}/>
        <Outsider id='right1' style={{left: '12%', top: '200px'}}/>
        <Outsider id='right2' style={{left: '3%', top:' 300px'}}/>
        <Outsider id='left' style={{right: '-5%'}}/>
        <Outsider id='left2' style={{right: '3%', top:' 50px'}}/>
        <Outsider id='left4' style={{right: '1%', top:' 300px'}}/>
        <Outsider id='left3' style={{right: '10%', top: '100px'}}/>

        <hr />

        <h2>These affects the parents above</h2>
        <p>You can specify which node the popup should attach itself to. The content will always change. Press the button below to see the popup attach to the header.</p>
        <button className='btnflt3' onClick={this.toggleAttatchToFirstParent.bind(this)}>{this.state.attachToHead ? 'Attach to individual parent' : 'Attach popup to head'}</button>
        <p>I guess you want to change the animation speed to: </p>
        <input type="number" step="50" value={this.state.animationTime} onChange={this.onAnimationSpeedChange.bind(this)} />

        <p>Maybe you want to control the speed of translation: </p>
        <input type="number" step="50" value={this.state.translateSpeed} onChange={this.onTransitionSpeedChange.bind(this)} />

        <p>Yep, you want to change how long the popup should stay visible: </p>
        <input type="number" step="50" value={this.state.timeout} onChange={this.onTimeoutChange.bind(this)} />


      </div>

    );
  }

}

export default App;
