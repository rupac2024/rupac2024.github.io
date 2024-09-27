/*
https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
https://youtu.be/T33NN_pPeNI?si=jmH6JLoa-e6aFcT4 

WHAT IS THE INTERSECTIONOBSERVER?
The IntersectionObserver is an API that will asynchronously observe changes in the intersection of a given element with the document's viewport.
Uses a callback function that is triggered when an element enters or exits an intersection with another element or the viewport OR when the intersection between two elements canges by a specified amount. 
CANNOT tell number of pixels that overlap; therefore, use % number. 
Callback function trigger: "target" element intersects viewport or specified element ("root"). 
To watch for intersection relative to the viewport, null = root option. 
Degree of intersection between "target" and "root" is the "intersection ratio". 
The intersection ratio is a percentage of the target elemenet as a value between 0.0 and 1.0. 

"OPTIONS" PARAMETER
IMPORTANT: options "rootMargin" field set to "50%" will consider intersection at 50% of the screen, thus doing entrance animation at half the screen.
observer.observe(target) where "target" is a specified target element, defines what element to track intersections. 

INTERSECTIONOBSERVERENTRY
The callback receives a list of IntersectionObserverEntry objects for each "target" that contains the following fields: 
- boundingClientRect
- intersectionRatio
- intersectionRect
- isIntersecting (use to check if element intersects with the root (i.e. visible))
- rootBounds
- target
- time

Use Window.requestIdleCallback() for time-consuming tasks becuase callback executes on main thread. 

INTERSECTION CALCULATION
Elements are considered rectangles that cover the element as best fit (i.e circles will be considered a square with the length of the radius). 

ROOT AND ROOT MARGIN
The specified root is the element or container that is an ancestor of the target OR the viewport. 
The "root intersection rectangle" is what is used to check the target and the root. 
The root rectangle is determined by: 
1) If the root is the Document, then the rectangle is the viewport. 
2) If the root has "overflow: clip" (CSS rule), the rectangle is the root's content area. 
3) If the root does not have an overflow clip, the rectangle is the root's boudning client rectangle (retrieved with .getBoundingClientRect() on the root).

This rectangle can be offset on each side with the rootMargin option field. 
- This can be defined similar to the CSS "margin" property values.
- Retrieved with IntersectionObserverEntry.rootBounds within the callback function's entry. 

THRESHOLD
This value defines the threshold at which the target is to be considered intersecting with the root (i.e. is visible so to speak). 
*/

// "options" controls the circumstances under which the callback is executed
let options = { 
    root: null, // define the root element (null for viewport) 
    rootMargin: "100%", // (similar CSS value: top right bottom left) margin of intersection that grows or shrinks the root element's boudning box before computing intersections
    threshold: 1.0 // (int or arr) when "target" is 100% visible within the "root", execute callback
};

// "callback" function to be executed when target element is considered to be intersecting as defined by the options  
let callback = (entries) => { // "entries" is the list of IntersectionObserverEntry objects of target elements
    entries.forEach(entry => { // iterate through list of entries
        console.log(entry); 
        if(entry.isIntersecting) { // if visible to root (i.e. all visible elements)
            entry.target.classList.add("show"); // add class (contains entrance animation)
        } else { // if not visible to root (i.e. all elements that are not to be entered)
            entry.target.classList.remove("show"); // remove class (no enterance animation)
        }
    });
};
const observer = new IntersectionObserver(callback, options);
const hiddenElements = document.querySelectorAll(".hidden"); // get all elements to be animated with the observer
hiddenElements.forEach((el) => observer.observe(el)); // for each element to animate, observe by the observer