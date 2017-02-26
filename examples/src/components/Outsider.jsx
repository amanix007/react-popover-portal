import React from 'react';
import Popover, {arrowPositions} from '../../../src/index';

class Outsider extends React.Component {
    constructor() {
        super();
        this.state = { open: false};

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
                <p 
                style={{background: 'rgba(0, 0, 0, 0.4)', padding: '10px'}}
                onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} className={this.props.right ? 'attach-to-border-right' : 'attach-to-border-left'}
                id={this.props.id}>
                    This parent should be half visible
                </p>
                <Popover
                    prefix='popup' parent={'#' + this.props.id}
                    animationTime={3000}
                    translateSpeed={3000}
                    open={this.state.open}>
                    <div className={'popup-content'}>
                        I am always in viewport
                    </div>
                </Popover>
            </div>
        );
    }

}

export default Outsider;
