[![Build Status](https://travis-ci.org/onurhb/react-popover-portal.svg?branch=master)](https://travis-ci.org/onurhb/react-popover-portal)

# react-popover-portal
A simple popover that renders to the body. Accelerated translation between nodes.  <br/>

![GIF](https://raw.githubusercontent.com/onurhb/react-popover-portal/master/showcase.gif)

# Example
1. Make sure that you have installed packages in root folder and examples folder. <br/>
2. To start webpack dev server, run `npm start` inside `/examples` folder. <br/>
3. Navigate to `localhost:8080` in your browser to see the result.

# Usage

#### In your react app : 

```
<div>
    <p onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup} id='parent'>
        The parent
    </p>
    <Popover
        prefix='popup' parent='#parent'
        animationTime={300}
        translateSpeed={300}
        onMouseEnter={this.displayPopup} onMouseLeave={this.hidePopup}
        open={this.state.open}>
        <div className={'popup-content'}>
            The popup content
        </div>
    </Popover>
</div>
```
> Adding `onMouseEnter` and `onMouseLeave` to Popover prevents it from disappearing when hovered

#### In your css file : 

```
// - Because our prefix is popup
.popup {
	background: black;
}

// - By default the carret will be in middle 
.popup:after {
	bottom: 100%;
	left: 50%;
	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
	border-color: rgba(29, 39, 46, 0);
	border-bottom-color: black;
	border-width: 10px;
	margin-left: -10px;

  // - If you want to animate the carret
  transition: all 0.5s ease;
}

// - Move carret to left 
.popup-arrow__left:after {
  left: 5%;
}

// - Move carret to right 
.popup-arrow__right:after {
	left: 95%;
}

// - Hide animation 
.popup__hidden{
  opacity: 0;
}

// - Active animation 
.popup__active{
  opacity: 1;
}
```

# Props 
|      Prop      	    |                                      Description                                      	|      Type      	|   Required   	| Default Value 	|
|:-------------------:|:-------------------------------------------------------------------------------------:	|:--------------:	|:------------:	|:-------------:	|
|     parent     	    |                        The DOM element to attach the popover to                       	| document query 	|   required   	|       -       	|
|      open      	    |                           If the popover should open or not                           	|      bool      	|   required   	|       -       	|
|     prefix     	    |                  A prefix used to add classes to the portal node                       	|     string     	| not required 	|      rpp      	|
|     timeout    	    |                    The time it takes until popover disappears (ms)                    	|     number     	| not required 	|      1000     	|
|  animationTime 	    |                          The duration of your appear and disappear animations (ms)    	|     number     	| not required 	|      350      	|
| translateSpeed 	    |                The speed of how fast popover translates between parents               	|     number     	| not required 	|      300      	|
|     offset     	    |                   The offset between the parent and popover (pixels)                  	|     number     	| not required 	|       10      	|
|  onMouseEnter  	    | Callback for when the mouse is hovering the popover. See examples for how it is used. 	|    function    	| not required 	|       -       	|
|  onMouseLeave  	    |                Callback for when the mouse is not hovering the popover.               	|    function    	| not required 	|       -       	|
|  getArrowPosition  	|     Callback for arrow position, returns a suggestion  ('left', 'right', 'center')     	|    function    	| not required 	|       -       	|

> You should always set onMouseEnter and onMouseLeave if you don't want the popup to disappear when hovering it. See examples (Icon.jsx). <br/>
> You don't need to use getArrowPosition as react-popover-portal adds `{prefix}-arrow__right` or `{prefix}-arrow__left` automatically to the portal node.
> It is there incase you need to re-position the carret programmatically. 

# Customize
You are free to customize the popup. react-popover-portal does not care on how your popup looks. Just pass a div as child.  <br/>
You can even animate the carret as I have done in examples. <br/>

> See `/examples/src/styles/index.scss` for an example (.popup class).

### Animate 
You can animate the popup when it appears or disappears. Simply add these classes to your css (with rpp as prefix): <br/>

```
.rpp__hidden{
  opacity: 0;
}

.rpp__active{
  opacity: 1;
}

```

> `{prefix}__active` will be added when the popover is visible and `{prefix}__hidden` will be added when the popover is closing. <br/>
> And also `{prefix}-arrow__right` / `{prefix}-arrow__left` will be added to the portal node. <br/>



