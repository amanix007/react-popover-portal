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
        translateSpeed: 310,
        transitions: [{
            name: 'all',
            type: 'ease' 
        }]
    }

    openPortal(){

        // - Prevent other components from removing the portal 
        clearTimeout(portal.timer);

        // - Add classes when portal is open
        portal.node.classList.add(this.props.prefix + '__active');
        portal.node.classList.remove(this.props.prefix + '__hidden');

    }

    closePortal(){

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

        const {translateSpeed, prefix, animationTime, transitions} = this.props;
        
        portal.node = document.createElement('div');

        // - Styles
        let allTransitions = `transform ${translateSpeed}ms ease`;

        // - Extra transitions 
        transitions.map((transition) => allTransitions += `, ${transition.name} ${animationTime}ms ${transition.type}`)

        console.log(allTransitions);

        portal.node.style.transition = allTransitions;
        portal.node.className = prefix + ' ' + prefix + '__hidden';
        portal.node.style.position = 'absolute';
        
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

        portal.node.style.transform = `translate(${left}px, ${top + this.props.offset}px)`;

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