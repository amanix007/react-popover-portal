import React from 'react';

import '../styles/animated';

import RaisedButton from 'material-ui/RaisedButton';

import AnimatedPopover from '../components/AnimatedPopover';


class Basic extends React.Component {
  constructor() {
    super();
  }


  render() {
    return(

    <div>

      <p>You can animate each parent's popover differently. Remember that you're actually animating the portal node and not the popover children.</p>
      <p>If you animate the width remember to specify the popup width to react-popover-portal as popupWidth prop.</p>
      <p>If you animate the height add <code>display:flex</code> to popover class and <code>height:100%</code> to children node.</p>
      <p><a style={{color:'white'}} href="https://github.com/onurhb/react-popover-portal/blob/master/examples/src/styles/animated.scss">GitHub</a></p>

      <AnimatedPopover id={'parent1'}                   style={{position: 'absolute', top: '430px', left: '12%'}}></AnimatedPopover>
      <AnimatedPopover id={'parent2'}                   style={{position: 'absolute', top: '500px', right: '42%'}}></AnimatedPopover>
      <AnimatedPopover id={'parent3'} special={true}    style={{position: 'absolute', top: '600px', left: '30%'}}></AnimatedPopover>
      <AnimatedPopover id={'parent4'}                   style={{position: 'absolute', top: '480px', right: '4%'}}></AnimatedPopover>
    </div>
    );
  }


}

export default Basic;
