# Framework Showcase

## Concept

The concept of the framework was, to divide a web pages into different component, define each of the component logics and connect them by pages script that handles the logic of the whole page. For the component logic to be observables and attach each other, it uses cycle.js concept.

## Code Modularization

The modularization of this framework was:

- component
	: Component of the web page. Each of it is attachable to any pages / places,
	doesn't require any data / state. Component are consist of:
	- index.js
		: The controller of the component that defines the component logic, and also the observable states of the component.
	- view.js
		: The view of the component that defines its appearance and any side-effects it can do. (In cycle.js, think of this as the driver)
	- template.html
		: The HTML format of the component, that will be used by view.js as the template.
	- style.css
		: The styling for the HTML of the component, that is required by view.js
- data
	: Data or states of the web page. Each of it has its own data that can interact with component based on each pages setup.
- pages
	: Main Controller of each pages. It defines the component and data it uses, and defines the logic of the application on the page.
- main.js
	: The entry of the scripts for Module Dependencies to start the application. It will use script from pages based on the current page.