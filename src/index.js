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

        // - Settings 
        prefix: PropTypes.string,
        timeout: PropTypes.number,
        offset: PropTypes.number,

        // - Animations 
        animationTime: PropTypes.number,
        translateSpeed: PropTypes.number,
        transitions: PropTypes.arrayOf(PropTypes.object),

        // - Events 
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func
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

    /**
     * Adds animation to the popup node and renews all transition attributes so each parent decides the attributes 
     */
    displayPortal() {

        const {translateSpeed, prefix, animationTime, transitions} = this.props;

        // - Prevent other components from removing the portal 
        clearTimeout(portal.timer);

        // - Add classes when portal is open
        portal.node.classList.add(this.props.prefix + '__active');
        portal.node.classList.remove(this.props.prefix + '__hidden');

        // - Styles
        let mTransitions = '';
        transitions.map((transition) => mTransitions += `${transition.name} ${animationTime}ms ${transition.type},`)

        mTransitions += `transform ${translateSpeed <= 0 ? 1 : translateSpeed}ms ease`;

        portal.node.style.transition = mTransitions;

    }

    /**
     * Adds animation classes and removes the app from DOM when the animation is finish 
     */
    scheduleHide() {


        const { prefix, timeout, animationTime } = this.props;
        // - Prevent other components from removing the portal 
        clearTimeout(portal.timer);

        portal.timer = setTimeout(() => {

            // - Add classes when portal is closed
            portal.node.classList.remove(prefix + '__active');
            portal.node.classList.add(prefix + '__hidden');

            portal.timer = setTimeout(() => ReactDOM.unmountComponentAtNode(portal.node), animationTime)

        }, timeout);

    }

    /**
     * Renders the portal if it is open and schedules hide if close 
     */
    componentWillReceiveProps(props) {

        const { open } = props;

        if (open) {
            this.displayPortal();
            this.renderPopup(props);
        }
        else {
            this.scheduleHide();
        }

    }

    /**
     * Initial 
     */
    componentDidMount() {

        if (!portal.node) {
            this.renderNode();
        }

    }

    /**
     * Renders portal node used to render react app into 
     * This node is added to the body and has animation capabilities 
     */
    renderNode() {

        const {translateSpeed, prefix, animationTime, transitions, offset} = this.props;

        portal.node = document.createElement('div');

        portal.node.className = prefix + ' ' + prefix + '__hidden';
        portal.node.style.position = 'absolute';

        portal.node.style.top = `${offset}px`;
        portal.node.style.left = '0px';

        document.body.appendChild(portal.node);
    }

    /**
     * If the parent is out of screen vertically, 
     * it will return a value which tells how much we should move the popup
     * so it is fully visible 
     * @param leftPosition float : the left position of the element  
     * @return float : offset 
     */
    calculateOffsetVertical(leftPosition, popupWidth){

        if(leftPosition - popupWidth / 2 < 0) return leftPosition;
        else if(leftPosition + popupWidth / 2 > window.innerWidth) return leftPosition + popupWidth - window.innerWidth - document.body.scrollLeft;
        
        return 0;
    }

    /**
     * Calculates the gap between parent and arrow 
     */
    getArrowGap(){

        const { parent } = this.props;

        const parentEl = document.querySelector(parent);

        const parentBounds = parentEl.getBoundingClientRect();

        const nodeBounds = portal.node.getBoundingClientRect();

        console.log('parent left: ', parentBounds.left, 'popup left: ', nodeBounds.left);

    }

    /**
     * Updates the portal node position using translate instead of top and left attributes
     */
    updatePosition() {

        const { parent } = this.props;

        const windowScrollVertical = document.body.scrollLeft;
        const windowScrollHorizontal = document.body.scrollTop;

        const parentEl = document.querySelector(parent);

        const parentBounds = parentEl.getBoundingClientRect();
        const nodeBounds = portal.node.getBoundingClientRect();

        // - Attach to parent and include horizontal scroll offset  
        let top = windowScrollHorizontal + parentBounds.top + parentBounds.height;

        // - Attach to middle of parent and also include the vertical scroll offset 
        let left = windowScrollVertical + parentBounds.left + parentBounds.width / 2 - nodeBounds.width / 2;

        left -= this.calculateOffsetVertical(left, nodeBounds.width);

        portal.node.style.transform = `translate(${left}px, ${top}px)`;

    }

    /**
     * Renders the react popup to the portal node 
     */
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

    /**
     * Returns the portal node 
     */
    getNode(){
        return portal.node;
    }

    /**
     * Not used as we are using portals to render instead 
     */
    render() {
        return null;
    }
}


export default Portal;