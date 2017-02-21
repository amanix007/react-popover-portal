import React, { Component } from 'react';

// - External components
import Popover from '../../../src/index';

class Icon extends Component {

    constructor() {
        super();
        this.state = { open: false };

        this.hidePopup = this.hidePopup.bind(this);
        this.displayPopup = this.displayPopup.bind(this);
    }

    hidePopup() {
        this.setState({ open: false });
    }

    displayPopup() {
        this.setState({ open: true });
    }

    render() {

        const {icon} = this.props;

        return (
            <div>
                <div id={icon} className='box' onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup}>
                    {this.state.open ? 'popup is visible' : 'popup is hiding'} : {icon}
                </div>
                <Popover 
                parent={'#' + icon} 
                open={this.state.open} 
                onMouseEnter={this.displayPopup} 
                onMouseLeave={this.hidePopup} 
                transitionName='fade'
                transitionTime={500}
                timeout={1000} 
                offset={15}>
                    <div className="arrow_box">
                        <h1>{icon}</h1>
                    </div>
                </Popover>
            </div>
        );
    }


}

export default Icon;
