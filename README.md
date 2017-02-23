# react-popover-portal
A simple popover that renders to the body. Accelerated translation between nodes.  <br/>

![GIF](https://raw.githubusercontent.com/onurhb/react-popover-portal/master/showcase.gif)

# Example
1. Make sure that you have installed packages in root folder and examples folder. <br/>
2. To start webpack dev server, run `npm start` inside `/examples` folder. <br/>
3. Navigate to `localhost:8080` in your browser to see the result.

# Props 
|      Prop      	|                                      Description                                      	|      Type      	|   Required   	| Default Value 	|
|:--------------:	|:-------------------------------------------------------------------------------------:	|:--------------:	|:------------:	|:-------------:	|
|     parent     	|                        The DOM element to attach the popover to                       	| document query 	|   required   	|       -       	|
|      open      	|                           If the popover should open or not                           	|      bool      	|   required   	|       -       	|
|     prefix     	|                  A prefix used to add classes to the portal container                 	|     string     	| not required 	|      spp      	|
|     timeout    	|                    The time it takes until popover disappears (ms)                    	|     number     	| not required 	|      1000     	|
|  animationTime 	|                          The duration of your animation (ms)                          	|     number     	| not required 	|      350      	|
| translateSpeed 	|                The speed of how fast popover translates between parents               	|     number     	| not required 	|      300      	|
|     offset     	|                   The offset between the parent and popover (pixels)                  	|     number     	| not required 	|       10      	|
|  onMouseEnter  	| Callback for when the mouse is hovering the popover. See examples for how it is used. 	|    function    	| not required 	|       -       	|
|  onMouseLeave  	|                Callback for when the mouse is not hovering the popover.               	|    function    	| not required 	|       -       	|

> You should always set onMouseEnter and onMouseLeave if you don't want the popup to disappear when hovering it. See examples. 

# Customize
You are free to customize the popup. react-popover-portal does not care on how your popup looks. Just pass a div as child.  <br/>
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


> `__active` will be added when the popover is visible and `__hidden` will be added when the popover is closing. 

