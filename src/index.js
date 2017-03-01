import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';


let groups = {};

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
        group: PropTypes.string,

        // - Settings 
        prefix: PropTypes.string,                                   // - Prefix used to add classes to portal node 
        timeout: PropTypes.number,                                  // - Time to disappear
        offset: PropTypes.number,                                   // - Offset to parent
        arrowWidth: PropTypes.number,                               // - Set arrowWidth if you use getArrowPosition() to position the arrow
        popupWidth: PropTypes.number,                               // - Set popupWidth if you need to animate the width

        // - Animations 
        animationTime: PropTypes.number,                            // - The animation speed
        translateSpeed: PropTypes.number,                           // - How fast the portal translates between nodes
        translateEase: PropTypes.string,
        transitions: PropTypes.arrayOf(PropTypes.object),           // - List of transitions {name: opacity and height... , ease: ease and ease-out...}

        // - Events 
        onMouseEnter: PropTypes.func,                               // - mouseEnters the popup
        onMouseLeave: PropTypes.func,                               // - mouseLeaves the popup

        // - Callbacks
        getArrowPosition: PropTypes.func                            // - suggests an arrow position 

    }

    static defaultProps = {
        prefix: 'rpp',
        timeout: 1000,
        offset: 10,
        arrowWidth: 0,
        animationTime: 420,
        translateSpeed: 420,
        group: 'portal',
        translateEase: 'ease-in-out',
        transitions: [{
            name: 'all',
            ease: 'ease'
        }]
    }

    constructor() {
        super();
        this.arrowPosition = 0;
    }

    /**
     * Adds animation to the popup node and renews all transition attributes so each parent decides the attributes 
     */
    displayPortal() {

        const {translateSpeed, prefix, animationTime, transitions, translateEase, group} = this.props;

        // - Prevent other components from removing the portal 
        clearTimeout(groups[group].timer);

        // - Add classes when portal is open
        groups[group].node.className = prefix
        groups[group].node.classList.add(prefix + '__active');
        groups[group].node.classList.remove(prefix + '__hidden');

        // - Styles
        let mTransitions = '';
        transitions.map((transition) => mTransitions += `${transition.name} ${animationTime}ms ${transition.ease},`)

        mTransitions += `transform ${translateSpeed < 0 ? 1 : translateSpeed}ms ${translateEase}`;

        groups[group].node.style.transition = mTransitions;

    }

    /**
     * Adds animation classes and removes the app from DOM when the animation is finish 
     */
    scheduleHide() {

        const { prefix, timeout, animationTime, group} = this.props;

        // - Prevent other components from removing the portal 
        clearTimeout(groups[group].timer);

        groups[group].timer = setTimeout(() => {

            // - Add classes when portal is closed
            groups[group].node.classList.remove(prefix + '__active');
            groups[group].node.classList.add(prefix + '__hidden');

            groups[group].timer = setTimeout(() => {

                ReactDOM.unmountComponentAtNode(groups[group].node);
                groups[group].node.remove();
                groups[group] = null;

            }, animationTime)

        }, timeout);

    }

    /**
     * Renders the portal if it is open and schedules hide if close 
     */
    componentWillReceiveProps(props) {

        const { open, group } = props;

        if (!groups[group]) {
            this.renderNode();
        }
        
        if (open) {
            this.displayPortal();
            this.renderPopup(props);
        }

        else {
            this.scheduleHide();
        }

    }


    /**
     * Renders portal node used to render react app into 
     * This node is added to the body and has animation capabilities 
     */
    renderNode() {

        const { offset, group} = this.props;

        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.display = 'flex';

        node.style.top = `${offset}px`;
        node.style.left = '0px';

        groups[group] = { node: node, timer: null };

        document.body.appendChild(node);

    }

    /**
     * If the parent is out of screen vertically, 
     * it will return a value which tells how much we should move the popup
     * so it is fully visible 
     * @param leftPosition float : the left position of the element  
     * @return float : offset 
     */
    calculateOffsetVertical(left, popupWidth) {

        if (left < 0) {
            return left;
        } else if (left + popupWidth > document.body.clientWidth) {
            return left + popupWidth - document.body.clientWidth;
        }

        return 0;

    }

    /**
     * Calculates the gap between parent and arrow 
     * Negative values means that arrow should be moved to left
     */
    notifyArrowPosition(offset, popupWidth) {


        const { getArrowPosition, arrowWidth } = this.props;

        if (!getArrowPosition) return;

        let position;

        // - Calculate how much to offset so arrow is always pointing to parent 
        if (offset == 0) {
            position = popupWidth / 2 - arrowWidth / 2;     // - Is middle 
        } else if (offset < 0) {
            position = offset + popupWidth / 2 - arrowWidth / 2;         // - Is left  
            if(position < 0) position = 0;
        } else {
            position = offset + popupWidth / 2 - arrowWidth / 2;   // - Is right
            if(position > popupWidth) position = popupWidth - arrowWidth;
        }

        // - Only callback when arrowPosition is different 
        if (this.arrowPosition == position) return;

        // - Fire callback 
        getArrowPosition(position);

        this.arrowPosition = position;
    }

    /**
     * Updates the portal node position using translate instead of top and left attributes
     */
    updatePosition() {

        const { parent, popupWidth, group } = this.props;

        const windowScrollVertical = document.body.scrollLeft;
        const windowScrollHorizontal = document.body.scrollTop;

        const parentEl = document.querySelector(parent);

        const parentBounds = parentEl.getBoundingClientRect();
        const portalWidth = popupWidth || groups[group].node.getBoundingClientRect().width;

        // - Attach to parent and include horizontal scroll offset  
        let top = windowScrollHorizontal + parentBounds.top + parentBounds.height;

        // - Attach to middle of parent and also include the vertical scroll offset 
        let left = windowScrollVertical + parentBounds.left + parentBounds.width / 2 - portalWidth / 2;

        // - Incase the popup goes out of screen 
        const offset = this.calculateOffsetVertical(left, portalWidth);
        left -= offset;

        groups[group].node.style.transform = `translate(${left}px, ${top}px)`;

        // - Callback so user can update arrow position 
        this.notifyArrowPosition(offset, portalWidth);

    }

    /**
     * Renders the react popup to the portal node 
     */
    renderPopup(props) {

        // - Render portal 
        const {children, group, ...other} = props;

        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Popover {...other}>{children}</Popover>,
            groups[group].node,
            () => this.updatePosition()
        );

    }

    /**
     * Returns the portal node 
     */
    getNode(group = 'portal') {
        return groups[group].node;
    }

    /**
     * Not used as we are using portals to render instead 
     */
    render() {
        return null;
    }
}


export default Portal;