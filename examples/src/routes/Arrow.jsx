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
      <ArrowPopover id={'parent1'} content='1 : arrow should move'      style={{position: 'absolute', top: '350px', left: '-2%'}}></ArrowPopover>
      <ArrowPopover id={'parent2'} content='2 : do you see it moving?'  style={{position: 'absolute', top: '500px', left: '37%'}}></ArrowPopover>
      <ArrowPopover id={'parent3'} content='3 : does it twerk?'         style={{position: 'absolute', top: '300px', left: '60%'}}></ArrowPopover>
      <ArrowPopover id={'parent4'} content='4 : yes it does! That is cool!'           style={{position: 'absolute', top: '600px', right: '-1%'}}></ArrowPopover>
    </div>
    );
  }


}

export default Arrow;
