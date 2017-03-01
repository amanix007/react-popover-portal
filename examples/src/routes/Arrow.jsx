import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import ArrowPopover from '../components/ArrowPopover';
import '../styles/arrow';

class Arrow extends React.Component {
  constructor() {
    super();
    this.state = {attachToButton : false}
  }

  toggleAttachToButton(){
    this.setState({attachToButton: !this.state.attachToButton});
  }



  render() {
    return(
    <div>

      <p>The arrow gets automatically positioned close to parent.</p>
      <p>To do this use getArrowPosition() callback. This gives you a left position which can be used to position the arrow.</p>
      <p>See examples <code>ArrowPopover.jsx</code> component at</p>
      <a style={{color:'white'}} href="https://github.com/onurhb/react-popover-portal/tree/master/examples/src/components">GitHub</a>
      

      <ArrowPopover id={'parent1'} content='1 : arrow should move'      style={{position: 'absolute', top: '350px', left: '-2%'}}></ArrowPopover>
      <ArrowPopover id={'parent2'} content='2 : do you see it moving?'  style={{position: 'absolute', top: '500px', left: '37%'}}></ArrowPopover>
      <ArrowPopover id={'parent3'} content='3 : does it twerk?'         style={{position: 'absolute', top: '420px', left: '60%'}}></ArrowPopover>
      <ArrowPopover id={'parent4'} content='4 : yes it does! That is cool!'           style={{position: 'absolute', top: '600px', right: '-1%'}}></ArrowPopover>
      <ArrowPopover id={'parent5'} content='5 : Hi me again!'         style={{position: 'absolute', top: '730px', right: '-4%'}}></ArrowPopover>
      <ArrowPopover id={'parent6'} content='6 : whatsup?'         style={{position: 'absolute', top: '630px', left: '-4%'}}></ArrowPopover>
    </div>
    );
  }


}

export default Arrow;
