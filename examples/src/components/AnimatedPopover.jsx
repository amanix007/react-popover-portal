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

    // - By default react-popover-portal uses transition on all attributes, you can override it 
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
            {this.props.special ? 'This parent has its own popup styles!' : 'Parent'}
        </div>

        {this.props.special ? 
        
        <Popover 
            animationTime={500} transitionSpeed={420} transitionEase='ease-in-out'
            getArrowPosition={this.updateArrowPosition.bind(this)} arrowWidth={10}
            prefix='popupAnimatedSpecial' parent={'#' + this.props.id} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} open={this.state.open}>
                <span className='triangle' style={{left: this.state.arrowPositionX}}></span>
                <div className='popupAnimatedSpecial-content'>
                   I should animated on appear and disappear
                </div>
        </Popover>
        :
        <Popover 
            animationTime={500} transitionSpeed={420} transitionEase='ease-in-out'
            getArrowPosition={this.updateArrowPosition.bind(this)} arrowWidth={10}
            prefix='popupAnimated' parent={'#' + this.props.id} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} open={this.state.open}>
                <span className='triangle' style={{left: this.state.arrowPositionX}}></span>
                <div className='popupAnimated-content'>
                   I should animated on appear and disappear
                </div>
        </Popover>
        }
         

    </div>
    );
  }


}

export default ArrowPopover;
