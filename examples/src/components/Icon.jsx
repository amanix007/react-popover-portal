import React, { Component } from 'react';

// - External components
import Popover from '../../../src/index';

class Icon extends Component {

    constructor() {
        super();
        this.state = { open: false };

        this.hidePopup = this.hidePopup.bind(this);
        this.displayPopup = this.displayPopup.bind(this);
        this.onPopupHover = this.onPopupHover.bind(this);
        this.onPopupLeave = this.onPopupLeave.bind(this);
    }

    hidePopup() {
        this.setState({ open: false });
        // console.log('You are not hovering the parent ', this.props.icon);
    }

    displayPopup() {
        this.setState({ open: true });
        // console.log('You are hovering the parent ', this.props.icon);
    }

    onPopupHover(){
        this.setState({ open: true });
        // console.log('You are hovering the popup content');

    }

    onPopupLeave(){
        this.setState({ open: false });
        // console.log('You are not hovering the popup content anymore');
    }


    render() {

        const {icon} = this.props;

        const transitions = [
            {
                name: 'background',
                type: 'linear'
            }
        ]

        return (
            <div>
                
                <div id={icon} className='box' onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup}>
                    {this.state.open ? 'popup is visible' : 'popup is hiding'} : {icon}
                </div>

                <Popover 
                translateSpeed={this.props.translateSpeed}
                animationTime={this.props.animationTime} 
                timeout={this.props.timeout}
                prefix='popup' parent={'#' + this.props.parent} 
                open={this.state.open} 
                onMouseEnter={this.onPopupHover} onMouseLeave={this.onPopupLeave}>
                    <div className='popup-content'>
                       <h1>{icon}</h1>
                    </div>
                </Popover>

            </div>
        );
    }


}

export default Icon;
