import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const portal = { node: null, timer: null };

class PopoverContent extends Component {


    render() {

        const { children, handleMouseEnter, handleMouseLeave } = this.props;

        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                

            <div key={0} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {typeof children.type === 'function' ? React.cloneElement(children) : children}
            </div>

            </ReactCSSTransitionGroup>

        );
    }
}

class Popover extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        parent: PropTypes.string.isRequired,
        popoverClass: PropTypes.string,
        timeout: PropTypes.number
    }

    static defaultProps = {
        popoverClass: 'react-portal-popover__class',
        timeout: 1500
    }

    constructor() {
        super();

        // - Wheterver the popover is hovered 
        this.hover = false;

        // - Bind
        this.removePortal = this.removePortal.bind(this);

    }

    componentWillReceiveProps(props) {
        const { open } = props;

        if (open == this.props.open) return;

        if (open) {
            this.renderPortal();
        } else {
            this.removePortal();
        }

    }

    componentDidMount() {

        if (!portal.node) {
            this.renderNode();
        }
    }

    componentWillUnmount() {
        this.removePortal();
    }


    renderNode() {
        portal.node = document.createElement('div');
        portal.node.className = this.props.popoverClass;

        // - Styles
        portal.node.style.transition = 'all 0.5s ease';
        portal.node.style.position = 'absolute';


        document.body.appendChild(portal.node);
    }

    updateNode() {

        const parent = document.querySelector(this.props.parent);

        const bounds = parent.getBoundingClientRect();
        const nodeBounds = portal.node.getBoundingClientRect();

        // - Calculate position of node 
        let top = bounds.top + bounds.height + 5;
        let left = bounds.left + bounds.width / 2 - nodeBounds.width / 2;

        portal.node.style.top = top + 'px';
        portal.node.style.left = left + 'px';

    }

    removePortal() {
        // - Clear other existing timers 
        clearTimeout(portal.timer);
        // - Schedule unmount 
        portal.timer = setTimeout(() => ReactDOM.unmountComponentAtNode(portal.node), this.props.timeout)
    }

    renderPortal() {

        // - Delete any timer
        clearTimeout(portal.timer);

        // - Render portal 
        const children = this.props.children;

        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <PopoverContent
                parent={this.props.parent}
                handleMouseLeave={this.props.onMouseLeave}
                handleMouseEnter={this.props.onMouseEnter}
            > 
            {children}
            </PopoverContent>,
            portal.node
        );

        this.updateNode(true);
    }


    render() {
        return null;
    }
}


export default Popover;