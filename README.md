[![Build Status](https://travis-ci.org/onurhb/react-popover-portal.svg?branch=master)](https://travis-ci.org/onurhb/react-popover-portal)

# react-popover-portal
A simple 'shared' popover that renders to the body. Accelerated translation between nodes.  

`npm install -S react-popover-portal`

[Demo](https://react-popover-portal.herokuapp.com/)

![GIF](https://raw.githubusercontent.com/onurhb/react-popover-portal/master/showcase.gif)

# Example
1. Make sure that you have installed packages in root folder and examples folder.  
2. To start webpack dev server, run `npm start` inside `/examples` folder.  
3. Navigate to `localhost:8080` .

# Usage

#### In your React component: 

```javascript

render(){
  return (<div>
      <p onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} id='parent'> 
      The parent 
      </p>

      <Popover prefix='popup' parent='#parent' open={this.state.open}
          onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup}>

          <div className={'popup-content'}>
              Popup
          </div>
      </Popover>
      
  </div>);
}
```
> Adding `onMouseEnter` and `onMouseLeave` to Popover prevents it from disappearing when hovered  

#### In your CSS file: 

```css
// - With 'popup as prefix'
.popup {
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.popup-content{
  // - Add padding here to the content 
  padding: 10px;
}
```

> Do not add margins to children class `.popup-content`. The onMouseEnter and onMouseLeave does not work on empty space.  
> If you set .popup height you also need to make sure the children div is covering the whole area. See issues section below. 


# Props 
|      Prop      	    |                                      Description                                      	|      Type      	|   Required   	| Default Value 	          |
|:-------------------:|:---------------------------------------------------------------------------------------:|:---------------:|:-------------:|:-------------------------:|
|     parent     	    |                        The DOM element to attach the popover to                       	| document query 	|   required   	|       -       	          |
|      open      	    |                           If the popover should open or not                           	|      bool      	|   required   	|       -       	          |
|      group      	  |                      a string which is used to create independent popups               	|      bool      	| not required 	|       -       	          |
|  arrowWidth  	      |                              Size of your carret    	                                  |    number     	| not required 	|       -       	          |
|  popupWidth  	      |                  Size of your popup, required if you animate width     	                |    number     	| not required 	|       -       	          |
|     prefix     	    |                  A prefix used to add classes to the portal node                       	|     string     	| not required 	|      rpp      	          |
|     timeout    	    |                    The time it takes until popover disappears (ms)                    	|     number     	| not required 	|      1000     	          |
|  animationTime 	    |                          The duration of your appear and disappear animations (ms)    	|     number     	| not required 	|      350      	          |
| translateSpeed 	    |                The speed of how fast popover translates between parents               	|     number     	| not required 	|      300      	          |
|  translateEase 	    |                Translate ease of when popover translates between parent                	|     string      | not required 	|     'ease'                |
|     transitions	    |                List of transitions {name: opacity , ease: 'linear'}                   	|Array of objects | not required 	| {name:'all', ease:'ease'} |
|     offset     	    |                   The offset between the parent and popover (pixels)                  	|     number     	| not required 	|       10      	          |
|  onMouseEnter  	    |               Callback for when the mouse entered the popover content.  	              |    function    	| not required 	|       -       	          |
|  onMouseLeave  	    |                Callback for when the mouse leaved the popup content                    	|    function    	| not required 	|       -       	          |
|  getArrowPosition  	|                       Callback for arrow positioning (left position)                  	|    function    	| not required 	|       -       	          |


> If you are using a carret specify the width with arrowWidth prop.  

# Customize
You are free to customize the popup. react-popover-portal does not care on how your popup looks.  
However you should use the `prefix` to add styles and animation as it is top level parent. 

### Animate 
You can animate the popup when it appears or disappears. Simply add these classes to your CSS (with popup as prefix):  

```css
.popup__hidden{
  opacity: 0;
}

.popup__active{
  opacity: 1;
}
```
> Prefixes `{prefix}__active`  and `{prefix}__hidden` will be added to the portal node.  
> See `/examples/src/styles/animated.scss` and `/examples/src/components/AnimatedPopover.jsx`

# Known issues
- When you set the height of the popup in your CSS file (eg. animating it from 0px to 200px) the children will still have a fixed height.
Because the onMouseEnter and onMouseLeave is listening on child events, the popup will close even when the user is hovering the popup.
If you need to set the height, simply add `display:flex` to the popup class and `height:100%` to the container child to force it to cover the popup. 

- Animating the width is problematic as it is used to calculate popover position before attaching it to the parent.
A solution to fix this problem is by passing the final width as a prop. 

# Features to add 
- Possible to specify position of the popup relative to parent: 'left', 'bottom', 'top' and 'right'
- Force the arrow to point to a specific position on the parent, eg parent's right corner. 
