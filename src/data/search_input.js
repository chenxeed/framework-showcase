import xs from 'xstream';
import $ from 'jquery';

// observable state
const getSearchInput$ = xs.create();

// setter
function setSearchInput(value){
	getSearchInput$.shamefullySendNext(value);
}

export {
	getSearchInput$,
	setSearchInput
}