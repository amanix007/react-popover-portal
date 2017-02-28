import React from 'react';

// - react-portal-popover
import Popover from '../../../src/index';


class Group extends React.Component {
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
    return(
    <div>
      
        <div className="box" style={this.props.style} onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} id={this.props.id}>
            {this.props.group}
        </div>

         <Popover open={this.state.open}
          getArrowPosition={this.updateArrowPosition.bind(this)} arrowWidth={10} 
          prefix='popupGroup' group={this.props.group} parent={'#' + this.props.id} 
          onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} >

                <span className='triangle' style={{left: this.state.arrowPositionX}}></span>
                <div className='popupGroup-content'>
                   my group is {this.props.group}  
                </div>

        </Popover>

    </div>
    );
  }


}

export default Group;
