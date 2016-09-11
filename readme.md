# Framework Showcase

## Concept

The concept of the framework was, to divide a web pages into different component, define each of the component logics and connect them by pages script that handles the logic of the whole page. For the component logic to be observables and attach each other, it uses cycle.js concept. The approach is using bottom-up approach, meaning that the whole sources are not thrown to each component, but defined specifically instead. This will ensure that all components are standalone and not dependant on specific component / data. The dependencies will be defined by the main controller.

## Code Modularization

The modularization of this framework was:

- component
	: Component of the web page. Each of it is attachable to any pages / places,
	doesn't require any data / state. Component are consist of:
	- index.js
		: The controller of the component that defines the component logic, the template used, and also the observable states of the component.
	- template.jsx
		: The HTML format of the component, that will be used by index.js as the vdom template.
	- style.css
		: The styling for the HTML of the component, that is required by index.js
- data
	: Data or states of the web page. Each of it has its own data that can interact with component based on each pages setup.
- pages
	: Main Controller of each pages. It connects the component and data it uses, and defines the logic of the application on the page.
- main.js
	: The entry of the scripts for Module Dependencies to start the application. It will use script from pages based on the current page.