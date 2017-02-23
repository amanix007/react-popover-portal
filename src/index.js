import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const portal = {
    node: null,
    timer: null
};

/**
 * The popover content gets rendered to this component
 */
const Popover = (props) => {

    const { children, onMouseEnter, onMouseLeave } = props;

    return ( 
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {typeof children.type === 'function' ? React.cloneElement(children) : children}
        </div>
    );
} 

/**
 * Controls the portal close and render
 */
class Portal extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        parent: PropTypes.string.isRequired,
        prefix: PropTypes.string,
        timeout: PropTypes.number,
        offset: PropTypes.number,
        animationTime: PropTypes.number,
        translateSpeed: PropTypes.number,
        transitions: PropTypes.arrayOf(PropTypes.object)
    }

    static defaultProps = {
        prefix: 'rpp',
        timeout: 1000,
        offset: 10,
        animationTime: 420,
        translateSpeed: 210,
        transitions: [{
            name: 'all',
            type: 'ease' 
        }]
    }

    displayPortal(){

        const {translateSpeed, prefix, animationTime, transitions} = this.props;

        // - Prevent other components from removing the portal 
        clearTimeout(portal.timer);

        // - Add classes when portal is open
        portal.node.classList.add(this.props.prefix + '__active');
        portal.node.classList.remove(this.props.prefix + '__hidden');

        // - Styles
        let allTransitions = '';
        transitions.map((transition) => allTransitions += `${transition.name} ${animationTime}ms ${transition.type},`)
        allTransitions += `transform ${translateSpeed}ms ease`;
        portal.node.style.transition = allTransitions;

    }

    scheduleHide(){

        // - Prevent other components from removing the portal 
        clearTimeout(portal.timer);

        portal.timer = setTimeout(() => {

            // - Add classes when portal is closed
            portal.node.classList.remove(this.props.prefix + '__active');
            portal.node.classList.add(this.props.prefix + '__hidden');

            portal.timer = setTimeout(() => ReactDOM.unmountComponentAtNode(portal.node), this.props.animationTime)

        }, this.props.timeout);

    }

    componentWillReceiveProps(props) {

        const { open, parent } = props;

        if(props.open) {
            this.displayPortal();
            this.renderPopup(props);
        }
        else {
            this.scheduleHide();
        }
        
    }


    componentDidMount() {

        if (!portal.node) {
            this.renderNode();
        }

    }


    renderNode() {

        const {translateSpeed, prefix, animationTime, transitions, offset} = this.props;
        
        portal.node = document.createElement('div');

        portal.node.className = prefix + ' ' + prefix + '__hidden';
        portal.node.style.position = 'absolute';
        
        portal.node.style.top = `${offset}px`;
        portal.node.style.left = '0px';
        
        document.body.appendChild(portal.node);
    }

    updatePosition() {

        const { parent } = this.props;


        const parentEl = document.querySelector(parent);

        const bounds = parentEl.getBoundingClientRect();
        const nodeBounds = portal.node.getBoundingClientRect();


        const top =  bounds.top + bounds.height;
        const left = bounds.left + bounds.width / 2 - nodeBounds.width / 2;

        portal.node.style.transform = `translate(${left}px, ${top}px)`;

    }

    renderPopup(props) {

        // - Render portal 
        const {children, ...other} = props;

        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Popover {...other}>{children}</Popover>,
            portal.node
        );

        this.updatePosition();
    
    }

    render() {
        return null;
    }
}


export default Portal;