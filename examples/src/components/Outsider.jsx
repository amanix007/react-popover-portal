import React from 'react';
import Popover, {arrowPosition} from '../../../src/index';

class Outsider extends React.Component {
    constructor() {
        super();
        this.state = { open: false, position: arrowPosition.RIGHT };

        this.hidePopup = this.hidePopup.bind(this);
        this.displayPopup = this.displayPopup.bind(this);
        this.arrowCallback = this.arrowCallback.bind(this);
    }

    hidePopup() {
        this.setState({ open: false });
    }

    displayPopup() {
        this.setState({ open: true });
    }

    arrowCallback(position){
        this.setState({position});
    }

    render() {

        return (

            <div>
                <p onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} className={this.props.right ? 'attach-to-border-right' : 'attach-to-border-left'}
                id={this.props.id}>
                    This parent should be half visible
                </p>
                <Popover
                    getArrowPosition={this.arrowCallback.bind(this)}
                    prefix='popup' parent={'#' + this.props.id}
                    open={this.state.open}>
                    <div className={'popup-content popup-arrow__' + this.state.position}>
                        I am always in viewport
                    </div>
                </Popover>
            </div>
        );
    }

}

export default Outsider;
