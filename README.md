[![Build Status](https://travis-ci.org/onurhb/react-popover-portal.svg?branch=master)](https://travis-ci.org/onurhb/react-popover-portal)

# react-popover-portal
A simple popover that renders to the body. Accelerated translation between nodes.  <br/>

`npm install -S react-popover-portal`

[Demo](https://react-popover-portal.herokuapp.com/)

![GIF](https://raw.githubusercontent.com/onurhb/react-popover-portal/master/showcase.gif)

# Example
1. Make sure that you have installed packages in root folder and examples folder. <br/>
2. To start webpack dev server, run `npm start` inside `/examples` folder. <br/>
3. Navigate to `localhost:8080` in your browser to see the result.

# Usage

#### In your react app : 

```
updateArrowPosition(arrowPosition){
    this.setState({arrowPosition});
}

render(){
return <div>
    <p
    onMouseEnter={this.displayPopup} 
    onMouseLeave={this.hidePopup}
    id='parent'>
        The parent
    </p>
    <Popover
        prefix='popup' parent={'#' + this.props.id}
        getArrowPosition={this.updateArrowPosition}
        arrowWidth={10}
        open={this.state.open}>

        <span className='triangle' 
          style={{left: this.state.arrowPosition, borderBottomColor: 'red'}}>
        </span>
        <div className={'popup-content'}>
            Popup
        </div>
        
    </Popover>
</div>
}
```
> Adding `onMouseEnter` and `onMouseLeave` to Popover prevents it from disappearing when hovered <br/>

#### In your css file : 

```
// - With 'popup as prefix'
.popup {
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

// - Just a simple triangle  that we can use to add carret to our popup 
.triangle {
  bottom: 100%;
  left: 0;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(29, 39, 46, 0);
  border-width: 10px;
  // - If you want to animate the carret
  transition: all 0.5s ease;
}
```

# Props 
|      Prop      	    |                                      Description                                      	|      Type      	|   Required   	| Default Value 	|
|:-------------------:|:-------------------------------------------------------------------------------------:	|:--------------:	|:------------:	|:-------------:	|
|     parent     	    |                        The DOM element to attach the popover to                       	| document query 	|   required   	|       -       	|
|      open      	    |                           If the popover should open or not                           	|      bool      	|   required   	|       -       	|
|  arrowWidth  	      |                              Size of your carret    	                                  |    number     	| not required 	|       0       	|
|     prefix     	    |                  A prefix used to add classes to the portal node                       	|     string     	| not required 	|      rpp      	|
|     timeout    	    |                    The time it takes until popover disappears (ms)                    	|     number     	| not required 	|      1000     	|
|  animationTime 	    |                          The duration of your appear and disappear animations (ms)    	|     number     	| not required 	|      350      	|
| translateSpeed 	    |                The speed of how fast popover translates between parents               	|     number     	| not required 	|      300      	|
|     offset     	    |                   The offset between the parent and popover (pixels)                  	|     number     	| not required 	|       10      	|
|  onMouseEnter  	    | Callback for when the mouse is hovering the popover. See examples for how it is used. 	|    function    	| not required 	|       -       	|
|  onMouseLeave  	    |                Callback for when the mouse is not hovering the popover.               	|    function    	| not required 	|       -       	|
|  getArrowPosition  	|                                 Callback for arrow positioning                         	|    function    	| not required 	|       -       	|

> You should always set onMouseEnter and onMouseLeave if you don't want the popup to disappear when hovering it. See examples (Icon.jsx). <br/>
> If you are using a carret specify the width with arrowWidth prop. <br/>

# Customize
You are free to customize the popup. react-popover-portal does not care on how your popup looks. Just pass a div as child.  <br/>
You can even animate the carret as I have done in examples. <br/>

> See `/examples/src/styles/index.scss` for an example (.popup class).

### Animate 
You can animate the popup when it appears or disappears. Simply add these classes to your css (with popup as prefix): <br/>

```
.popup__hidden{
  opacity: 0;
}

.popup__active{
  opacity: 1;
}

```
> `{prefix}__active` will be added when the popover is visible and `{prefix}__hidden` will be added when the popover is closing. <br/>

# Known issues
- Popup children does not cover the whole area by default which results onMouseEnter or onMouseLeave not firing even when the mouse is hovering the popup. This happens only when you set height on the portal node. To prevent this issue, simply add display:flex to your popup class and height:100% to the popup child.   

