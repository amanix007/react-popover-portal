import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

const portal = {
    node: null,
    timer: null,
    active: false
};



/**
 * The popover controls when the portal is removed 
 */
class Popover extends Component {
    render() {

        const { children, offset, ...other } = this.props;

        return ( 
            <div onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
                <div style={{ height: offset }}></div>
                {typeof children.type === 'function' ? React.cloneElement(children) : children}
            </div>
        );
    }
}

class Portal extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        parent: PropTypes.string.isRequired,
        prefix: PropTypes.string,
        timeout: PropTypes.number,
        offset: PropTypes.number,
        animationTime: PropTypes.number,
        translateSpeed: PropTypes.number
    }

    static defaultProps = {
        prefix: 'rpp',
        timeout: 1000,
        offset: 10,
        animationTime: 350,
        translateSpeed: 300,
    }

    openPortal(){
        clearTimeout(portal.timer);

        // - Add classes when portal is open
        portal.node.classList.add(this.props.prefix + '__active');
        portal.node.classList.remove(this.props.prefix + '__hidden');

        portal.active = true;
    }

    closePortal(){

        clearTimeout(portal.timer);
        portal.timer = setTimeout(() => {
          
            // - Add classes when portal is open
            portal.node.classList.remove(this.props.prefix + '__active');
            portal.node.classList.add(this.props.prefix + '__hidden');

            portal.timer = setTimeout(() => ReactDOM.unmountComponentAtNode(portal.node), this.props.animationTime)

            portal.active = false;

        }, this.props.timeout);
    }

    componentWillReceiveProps(props) {
        const { open, parent } = props;

        if(props.open) {
            this.openPortal();
            this.renderPortal(props);
        }
        else {
            this.closePortal();
        }
        
    }


    componentDidMount() {

        if (!portal.node) {
            this.renderNode();
        }
    }


    renderNode() {
        
        portal.node = document.createElement('div');

        // - Styles
        portal.node.style.transition = `all ${this.props.animationTime}ms ease, transform ${this.props.translateSpeed}ms ease`;
        portal.node.style.position = 'absolute';
        portal.node.className = this.props.prefix + ' ' + this.props.prefix + '__hidden';
        
        portal.node.style.top = '0px';
        portal.node.style.left = '0px';

        document.body.appendChild(portal.node);
    }

    updateNode() {

        const parent = document.querySelector(this.props.parent);

        const bounds = parent.getBoundingClientRect();
        const node = portal.node.getBoundingClientRect();


        const top =  bounds.top + bounds.height;
        const left = bounds.left + bounds.width / 2 - node.width / 2;

        portal.node.style.transform = `translate(${left}px, ${top}px)`;

    }

    renderPortal(props) {

        // - Render portal 
        const {children, ...other} = props;

        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Popover {...other}>{children}</Popover>,
            portal.node
        );

        this.updateNode();
        

    }

    render() {
        return null;
    }
}


export default Portal;