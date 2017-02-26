import React from 'react';

// - react-portal-popover
import Popover from '../../../src/index';


class Basic extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
    
    this.displayPopup = this.displayPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
  }

  hidePopup() {
    this.setState({ open: false });
  }

  displayPopup() {
    this.setState({ open: true });
  }

  render() {
    return(
    <div>
        <div className="box" style={this.props.style} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} id={this.props.id}>
            Parent
        </div>

         <Popover prefix='popupBasic' parent={'#' + this.props.id} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} open={this.state.open}>
                <div className='popupBasic-content'>
                   parent {this.props.content} says nae nae 
                </div>
        </Popover>

    </div>
    );
  }


}

export default Basic;
