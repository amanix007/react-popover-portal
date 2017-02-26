import React from 'react';
import Popover from '../../../src/index';

class Outsider extends React.Component {
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
        return (

            <div>
                <p onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} className={this.props.right ? 'attach-to-border-right' : 'attach-to-border-left'}
                id={this.props.id}>
                    This parent should be half visible and the popup should be fully visible
                </p>
                <Popover
                    translateSpeed={this.props.translateSpeed}
                    animationTime={this.props.animationTime}
                    timeout={this.props.timeout}
                    prefix='popup' parent={'#' + this.props.id}
                    open={this.state.open}
                    onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup}>
                    <div className='popup-content'>
                        I should still be fully visible
                    </div>
                </Popover>
            </div>
        );
    }

}

export default Outsider;
