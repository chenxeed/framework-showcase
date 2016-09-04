import xs from 'xstream';
import $ from 'jquery';

// observable state
const getPost$ = xs.create();

// getter
function getPost(value){
	$.ajax({
		url : 'http://jsonplaceholder.typicode.com/posts'
	}).done( (result) => getPost$.shamefullySendNext(result) );
}

export {
	getPost$,
	getPost
}