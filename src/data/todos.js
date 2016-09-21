import xs from 'xstream';
import $ from 'jquery';
import {find, findIndex} from 'lodash';

function todosData( sources ) {

  const add$ = sources
    .map( ({add$}) => add$
      .map( (title) => (state) => add( state, title ) ) )
    .flatten();

  const remove$ = sources
    .map( ({remove$}) => remove$
      .map( (id) => (state) => remove( state, id ) ) )
    .flatten();

  const toggleCheck$ = sources
    .map( ({toggleCheck$}) => toggleCheck$
      .map( (id) => (state) => toggleCheck( state, id ) ) )
    .flatten();

  const toggleCheckAll$ = sources
    .map( ({toggleCheckAll$}) => toggleCheckAll$
      .map( (is_checked) => (state) => toggleCheckAll( state, is_checked ) ) )
    .flatten();

  const reducer$ = xs.merge( add$, remove$, toggleCheck$, toggleCheckAll$ );

  const state$ = xs.of( [] )
    .map( state => reducer$.fold( (acc, reducer) => reducer(acc), state) )
    .flatten();
  
  return state$;
}

// side-effect functions
function add( todos, title ) {
  todos.push({
    id: Math.round( Math.random()*100000000 ), // random way to get random id
    title: title,
    is_checked: false
  });
  return todos;
}

function remove( todos, id ) {
  todos.splice( findIndex( todos, {'id' : id} ), 1 );
  return todos;
}

function toggleCheck( todos, id ) {
  const todo = find( todos, {'id': id} );
  if(todo)
    todo.is_checked = todo.is_checked ? false : true;
  return todos;
}

function toggleCheckAll( todos, is_checked ) {
  return todos.map( (todo) => {
    todo.is_checked = is_checked;
    return todo;
  });
}

export default todosData;