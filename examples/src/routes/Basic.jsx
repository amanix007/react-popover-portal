import React from 'react';

import '../styles/basic';

import RaisedButton from 'material-ui/RaisedButton';

import ArrowPopover from '../components/BasicPopover';


class Basic extends React.Component {
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
      <RaisedButton onClick={this.toggleAttachToButton.bind(this)} id='parent0' label='Press me and hover the parents below'></RaisedButton>

      <ArrowPopover id={this.state.attachToButton ? 'parent0' : 'parent1'} content='1'  style={{position: 'absolute', top: '300px', left: '2%'}}></ArrowPopover>
      <ArrowPopover id={this.state.attachToButton ? 'parent0' : 'parent2'} content='2'  style={{position: 'absolute', top: '400px', right: '12%'}}></ArrowPopover>
      <ArrowPopover id={this.state.attachToButton ? 'parent0' : 'parent3'} content='3'  style={{position: 'absolute', top: '500px', left: '40%'}}></ArrowPopover>
      <ArrowPopover id={this.state.attachToButton ? 'parent0' : 'parent4'} content='4'  style={{position: 'absolute', top: '500px', right: '20%'}}></ArrowPopover>
    </div>
    );
  }


}

export default Basic;
