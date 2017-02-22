import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

const portal = {
    node: null,
    timer: null,
    active: false
};


/**
 * The popovercontent animates the popover and also renders it's children 
 * It is relied on ReactTransitionGroup for the animations.
 * The portal will be deleted after the animation is ended 
 */
class PopoverContent extends Component{

    addAnimation(){
        clearTimeout(portal.timer);
        portal.active = true;

        portal.node.classList.add(this.props.prefix + '__active');
        portal.node.classList.remove(this.props.prefix + '__hidden');
    }

    removeAnimation(){
        portal.node.classList.add(this.props.prefix + '__hidden');
        portal.node.classList.remove(this.props.prefix + '__active');
    }

    componentWillAppear(callback) {
        this.addAnimation();
        callback();
    }

    componentWillEnter(callback){
        this.addAnimation();
        callback();
    }

    componentWillLeave(callback) {
        clearTimeout(portal.timer);
        portal.timer = setTimeout(() => {

            this.removeAnimation();
            console.log('removing animation', portal.active);

            clearTimeout(portal.timer);
            if(portal.active) return callback();
            
            portal.timer = setTimeout(() =>{
                callback();
                portal.active = false;
            }, this.props.animationTime)

        }, this.props.timeout - this.props.animationTime);
    }

    render(){

        const { children, offset} = this.props;

        return (
            <div>
                <div style={{ height: offset }}></div>
                {typeof children.type === 'function' ? React.cloneElement(children) : children}
            </div> 
        );

    }
}

/**
 * The popover controls when the portal is removed 
 */
class Popover extends Component {

    constructor(){
        super();
        this.state = {hovered: false, visible: false }
    }

    componentWillMount(){
        this.setState({visible: this.props.open})
    }

    componentWillReceiveProps(props){
         this.setState({visible: props.open || this.state.hovered});
    }

    handleMouseEnter(){
        this.setState({hovered: true, visible: true});
    }

    handleMouseLeave(){
        this.setState({hovered: false, visible: false});
    }

    shouldComponentUpdate(){
        return true;
    }

    render() {

        const { children, ...other } = this.props;
        const visible = this.state.visible;
 
        return ( 
        <ReactTransitionGroup>
            {visible ? 
                    <PopoverContent {...other}>
                        <div onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                            {children}
                        </div>
                    </PopoverContent>
            : null}
        </ReactTransitionGroup>
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
    }

    static defaultProps = {
        prefix: 'rpp',
        timeout: 3000,
        offset: 10,
        animationTime: 300,
    }

    componentWillReceiveProps(props) {
        const { open } = props;

        this.renderPortal(props);
    }


    componentDidMount() {
        if (!portal.node) {
            this.renderNode();
        }
    }


    renderNode() {
        
        portal.node = document.createElement('div');

        // - Styles
        portal.node.style.transition = `all 400ms ease`;
        portal.node.style.position = 'absolute';

        document.body.appendChild(portal.node);
    }

    updateNode() {

        const parent = document.querySelector(this.props.parent);

        const bounds = parent.getBoundingClientRect();
        const nodeBounds = portal.node.getBoundingClientRect();

        // - Calculate position of node 
        let top = bounds.top + bounds.height;
        let left = bounds.left;

        portal.node.style.top = top + 'px';
        portal.node.style.left = left + 'px';

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