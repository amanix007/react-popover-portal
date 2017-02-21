import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

const portal = {
    node: null,
    timer: null
};


class PopoverContent extends Component{


    componentWillAppear(callback) {
        portal.node.style.opacity = 1;
        console.log('will appear');
        callback();
    }

    componentWillEnter(callback){
        portal.node.style.opacity = 1;
        console.log('will enter');
        callback();
    }

    componentWillLeave(callback) {
        console.log('will leave');
        portal.node.style.opacity = 0;

        setTimeout(() => {
            callback();
            this.props.onMouseLeave();
            ReactDOM.unmountComponentAtNode(portal.node);
        }, 500);
    }

    render(){

        const { children, offset, onMouseEnter, onMouseLeave} = this.props;

        return (

            <div style={{}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div style={{ height: offset }}></div>
                {typeof children.type === 'function' ? React.cloneElement(children) : children}
            </div> 

        );

    }
}

class Popover extends Component {

    constructor(){
        super();
        this.state = {visible: true}
    }

    componentWillReceiveProps(props){
        this.setState({visible: true});

        if (!props.open) {
            portal.timer = setTimeout(() => {
                this.setState({visible: false});
            }, props.timeout);
        } else {
            clearInterval(portal.timer);
        }
                    
    }

    render() {
        const { children, ...other } = this.props;
        return ( 
        <ReactTransitionGroup>
            {this.state.visible ?
             <PopoverContent {...other}>{children}</PopoverContent> : null}
        </ReactTransitionGroup>
        );
    }
}

class Portal extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        parent: PropTypes.string.isRequired,
        popoverClass: PropTypes.string,
        timeout: PropTypes.number,
        offset: PropTypes.number,
    }

    static defaultProps = {
        popoverClass: 'react-portal-popover__class',
        timeout: 500,
        offset: 0
    }

    componentWillReceiveProps(props) {
        const { open } = props;

        if (open == this.props.open) return;

        this.renderPortal(props);

    }

    componentDidMount() {

        if (!portal.node) {
            this.renderNode();
        }
    }


    renderNode() {
        portal.node = document.createElement('div');
        portal.node.className = this.props.popoverClass;

        // - Styles
        portal.node.style.transition = 'all 0.5s ease';
        portal.node.style.position = 'absolute';
        portal.node.style.opacity = 0;

        document.body.appendChild(portal.node);
    }

    updateNode() {

        const parent = document.querySelector(this.props.parent);

        const bounds = parent.getBoundingClientRect();
        const nodeBounds = portal.node.getBoundingClientRect();

        // - Calculate position of node 
        let top = bounds.top + bounds.height;
        let left = bounds.left + bounds.width / 2 - nodeBounds.width / 2;

        portal.node.style.top = top + 'px';
        portal.node.style.left = left + 'px';

    }

    renderPortal(props) {

        // - Delete any timer
        clearTimeout(portal.timer);

        // - Render portal 
        const {children, ...other} = props;

        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Popover {...other}>{children}</Popover>,
            portal.node
        );

        this.updateNode();
    }

    shouldComponentUpdate(){
        return false;
    }

    render() {
        return null;
    }
}


export default Portal;