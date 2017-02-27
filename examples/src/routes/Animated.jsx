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
      <AnimatedPopover id={'parent1'}                   style={{position: 'absolute', top: '330px', left: '12%'}}></AnimatedPopover>
      <AnimatedPopover id={'parent2'}                   style={{position: 'absolute', top: '440px', right: '42%'}}></AnimatedPopover>
      <AnimatedPopover id={'parent3'} special={true}    style={{position: 'absolute', top: '350px', left: '30%'}}></AnimatedPopover>
      <AnimatedPopover id={'parent4'}                   style={{position: 'absolute', top: '480px', right: '4%'}}></AnimatedPopover>
    </div>
    );
  }


}

export default Basic;
