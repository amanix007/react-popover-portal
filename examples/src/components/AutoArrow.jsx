import React from 'react';
import Popover from '../../../src/index';

class Outsider extends React.Component {
    constructor() {
        super();
        this.state = { open: false, arrowPositionY: 0};

        this.hidePopup = this.hidePopup.bind(this);
        this.displayPopup = this.displayPopup.bind(this);
        this.updateArrowPosition = this.updateArrowPosition.bind(this);
        
    }

    hidePopup() {
        this.setState({ open: false });
    }

    displayPopup() {
        this.setState({ open: true });
    }

    updateArrowPosition(arrowPositionY){
        this.setState({arrowPositionY:arrowPositionY});
    }


    render() {

        return (

            <div>
                <p
                style={this.props.style} 
                onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} className='attach-to-border'
                id={this.props.id}>
                    This parent uses smart popup
                </p>
                <Popover
                    prefix='popup' parent={'#' + this.props.id}
                    getArrowPosition={this.updateArrowPosition}
                    arrowWidth={10}
                    open={this.state.open}>

                    <span className='triangle' style={{left: this.state.arrowPositionY}}></span>
                    <div className={'popup-content'}>
                        I am always in viewport
                        <h4>Notice my red arrow</h4>
                    </div>
                    
                </Popover>
            </div>
        );
    }

}

export default Outsider;
