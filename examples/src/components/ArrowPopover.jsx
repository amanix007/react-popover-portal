import React from 'react';

// - react-portal-popover
import Popover from '../../../src/index';


class ArrowPopover extends React.Component {
  constructor() {
    super();
    this.state = { open: false , arrowPositionX : 0};
    
    this.updateArrowPosition = this.updateArrowPosition.bind(this);
    this.displayPopup = this.displayPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
  }

  hidePopup() {
    this.setState({ open: false });
  }

  displayPopup() {
    this.setState({ open: true });
  }

updateArrowPosition(arrowPositionX){
      this.setState({arrowPositionX});
  }


  render() {

    const transitions = [
      {
        name: 'opacity',
        ease: 'ease'
      },{
        name: 'background',
        ease: 'ease-in-out'
      }
    ] 
    return(
    <div>
        <div className="box" style={this.props.style} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} id={this.props.id}>
            Parent
        </div>

         <Popover 
            getArrowPosition={this.updateArrowPosition.bind(this)} arrowWidth={10} transitions={transitions}
            prefix='popupArrow' parent={'#' + this.props.id} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} open={this.state.open}>
                <span className='triangle' style={{left: this.state.arrowPositionX}}></span>
                <div className='popupArrow-content'>
                   {this.props.content}
                </div>
        </Popover>

    </div>
    );
  }


}

export default ArrowPopover;
